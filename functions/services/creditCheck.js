'use strict';
// Credit-check provider for the rental-application review workflow (see
// controllers/dataController.js's ReviewRentalApplication/CompleteMockCreditCheck
// handling). Modelled on XDS's Credit Enquiry SOAP API — a real South
// African credit bureau's 4-step call chain — so a live adapter can be
// dropped in later without any caller (dataController.js, dc.js,
// admin-rentals.html) needing to change: they only ever see runCheck()'s
// return shape, never which adapter produced it.
//
//   1. login(strUser, strPwd)        -> { ticket }
//   2. isTicketValid(ticket)         -> boolean
//   3. connectConsumerMatch({...})   -> matched consumer + enquiry ids
//   4. connectGetResult({...})       -> the full parsed report
//
// CREDIT_CHECK_MODE=mock|live selects the adapter (defaults to mock, same
// no-op-until-configured shape as services/turnstile.js). Only the mock
// adapter is implemented today — see liveAdapter below for what a real
// integration needs.

const { runQuery } = require('./dataConnect');

const PRODUCT_ID = 15; // XDS "Consumer Credit Report" product

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function jitter(min, max) { return min + Math.random() * (max - min); }

// ─── Deterministic PRNG ───────────────────────────────────────────────────
// Every mock value below is seeded from the applicant's own idNumber, not
// from Math.random() — re-running a check for the same applicant (e.g. an
// admin re-opening "View Credit Check" after their client-side cache was
// lost) must reproduce the exact same report, not reshuffle it.
function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(rand, arr) { return arr[Math.floor(rand() * arr.length)]; }
function int(rand, min, max) { return min + Math.floor(rand() * (max - min + 1)); }

// ─── Reference data ────────────────────────────────────────────────────────
const ACCOUNT_TYPE_LEGEND = {
  B: 'Building Loan', C: 'Credit Card', D: 'Debt Recovery', E: 'Single Credit Facility',
  F: 'Open Services', G: 'Garage Card', H: 'Home Loans', I: 'Installment Account',
};
// Revolving accounts carry a limit + utilisation; the rest are term loans
// that amortise toward zero with a remaining term instead.
const REVOLVING_TYPES = new Set(['C', 'G', 'F', 'E']);
const PROVIDERS = {
  B: ['Nedbank Building Finance', 'ABSA Building Loans'],
  C: ['FNB', 'Standard Bank', 'Capitec', 'Discovery Bank', 'Nedbank'],
  D: ['ITC Recoveries', 'Northgate Debt Collections'],
  E: ['Edgars', 'Foschini', 'Truworths', 'Woolworths Financial Services'],
  F: ['Vodacom', 'MTN', 'Telkom', 'MultiChoice / DStv'],
  G: ['Engen Fleet Card', 'Shell Fleet Solutions', 'BP Fleet Card'],
  H: ['ABSA Home Loans', 'Standard Bank Home Loans', 'Nedbank Home Loans', 'FNB Home Loans'],
  I: ['WesBank', 'MFC', 'Toyota Financial Services', 'Lewis Stores', 'OK Furniture'],
};

function riskBand(score) {
  if (score >= 800) return { label: 'Minimal Risk', explanation: `Score band 800–999. Excellent credit standing — very low likelihood of default.` };
  if (score >= 650) return { label: 'Low Risk',     explanation: `Score band 650–799. Strong credit profile — most lenders would approve standard terms.` };
  if (score >= 500) return { label: 'Medium Risk',  explanation: `Score band 500–649. Lenders may approve with conditions.` };
  return                     { label: 'High Risk',    explanation: `Score band 0–499. Elevated risk of default — manual review strongly recommended.` };
}

function maskAccountNumber(rand) {
  const digits = () => int(rand, 0, 9);
  return `****${digits()}${digits()}${digits()}${digits()}`;
}

function paymentHistory(rand, score) {
  // Biased toward 0 (up to date) for higher scores, more 1/2/3 for lower —
  // keeps the 24-month strip visually consistent with the account's own
  // score-band narrative rather than being independently random.
  const badWeight = score >= 800 ? 0.02 : score >= 650 ? 0.08 : score >= 500 ? 0.22 : 0.4;
  const months = [];
  for (let i = 0; i < 24; i++) {
    const r = rand();
    months.push(r > badWeight ? 0 : r > badWeight * 0.5 ? 1 : r > badWeight * 0.2 ? 2 : 3);
  }
  return months;
}

function buildAccount(rand, type, score) {
  const provider = pick(rand, PROVIDERS[type]);
  const revolving = REVOLVING_TYPES.has(type);
  const openYearsAgo = int(rand, 1, 8);
  const openDate = new Date();
  openDate.setFullYear(openDate.getFullYear() - openYearsAgo);
  openDate.setMonth(int(rand, 0, 11));
  const adverse = score < 500 && rand() < 0.35;
  const closed = !adverse && rand() < 0.15;

  const account = {
    provider,
    typeCode: type,
    typeLabel: ACCOUNT_TYPE_LEGEND[type],
    accountNumber: maskAccountNumber(rand),
    openDate: openDate.toISOString().slice(0, 10),
    status: adverse ? 'ADVERSE' : closed ? 'CLOSED' : 'OPEN',
    subStatus: adverse ? 'In recovery' : closed ? 'Settled' : 'Up to date',
    paymentHistory: paymentHistory(rand, score),
  };

  if (revolving) {
    const limit = pick(rand, [5000, 10000, 15000, 25000, 40000, 60000]);
    const utilisationPct = adverse ? int(rand, 85, 100) : int(rand, 5, 90);
    account.limitZar = limit;
    account.balanceZar = Math.round((limit * utilisationPct) / 100);
    account.installmentZar = Math.round(account.balanceZar * 0.05) || 0;
    account.utilisationPct = utilisationPct;
  } else {
    const original = pick(rand, [80000, 150000, 250000, 450000, 900000, 1200000]);
    const termMonths = int(rand, 12, 240);
    const monthsElapsed = Math.min(termMonths, int(rand, 1, termMonths));
    account.originalAmountZar = original;
    account.balanceZar = Math.round(original * (1 - monthsElapsed / termMonths));
    account.installmentZar = Math.round(original / termMonths * 1.08);
    account.termRemainingMonths = termMonths - monthsElapsed;
  }

  return account;
}

function buildMockReport(seedStr, identity) {
  const rand = mulberry32(hashSeed(seedStr));
  const score = int(rand, 320, 960);
  const band = riskBand(score);

  const accountTypes = Object.keys(ACCOUNT_TYPE_LEGEND);
  const numAccounts = int(rand, 6, 10);
  const usedTypes = [];
  for (let i = 0; i < numAccounts; i++) usedTypes.push(pick(rand, accountTypes));
  const accounts = usedTypes.map((t) => buildAccount(rand, t, score));

  const enquirers = ['EquipCore Rentals', 'ABSA Vehicle Finance', 'FNB Personal Loans', 'Capitec Bank', 'Mr Price Money'];
  const enquiryReasons = ['Credit application', 'Account review', 'Affordability assessment', 'Rental application'];
  const previousEnquiries = Array.from({ length: int(rand, 3, 5) }, () => {
    const daysAgo = int(rand, 5, 540);
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return { date: d.toISOString().slice(0, 10), enquirer: pick(rand, enquirers), reason: pick(rand, enquiryReasons) };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  const hasHandover = score < 600 && rand() < 0.4;

  return {
    reportInformation: { reportId: 1, reportName: 'Consumer Credit Report' },
    consumer: {
      idNo: identity.idNumber || null,
      passportNo: identity.passportNo || null,
      firstName: identity.firstName || null,
      surname: identity.surname || null,
      birthDate: identity.birthDate || null,
      genderInd: hashSeed(seedStr + 'g') % 2 === 0 ? 'M' : 'F',
    },
    consumerDirectorSummary: { numberOfCompanyDirectorships: rand() < 0.15 ? int(rand, 1, 3) : 0 },
    accountTypeLegend: ACCOUNT_TYPE_LEGEND,
    accounts,
    score,
    riskBand: band.label,
    scoreExplanation: band.explanation,
    previousEnquiries,
    adverse: {
      handovers: hasHandover ? [{
        provider: pick(rand, PROVIDERS.D),
        amountZar: int(rand, 2000, 45000),
        date: (() => { const d = new Date(); d.setMonth(d.getMonth() - int(rand, 1, 18)); return d.toISOString().slice(0, 10); })(),
      }] : [],
      judgments: 0,
      debtReview: false,
    },
    generatedAt: new Date().toISOString(),
  };
}

// ─── Mock adapter ───────────────────────────────────────────────────────────
// Mirrors the live adapter's 4-step interface exactly. Simulated latency
// (300-800ms per step) so the admin UI's "Authenticating… Matching…
// Retrieving…" progression (see the state-machine button in
// admin-rentals.html) reflects genuine async steps, not an instant fake.
const mockAdapter = {
  async login(_strUser, _strPwd) {
    await sleep(jitter(300, 800));
    return { ticket: require('crypto').randomBytes(32).toString('hex') };
  },
  async isTicketValid(ticket) {
    await sleep(jitter(300, 800));
    return typeof ticket === 'string' && ticket.length === 64;
  },
  async connectConsumerMatch({ ticket, idNumber, passportNo, firstName, surname, birthDate, yourReference }) {
    await sleep(jitter(300, 800));
    if (!ticket) throw new Error('Invalid ticket');
    const seed = idNumber || passportNo || `${firstName}|${surname}|${birthDate}`;
    const consumerId = require('crypto').createHash('sha1').update(String(seed)).digest('hex').slice(0, 20);
    return {
      consumerId,
      firstName: firstName || null,
      secondName: null,
      thirdName: null,
      surname: surname || null,
      idNo: idNumber || null,
      passportNo: passportNo || null,
      birthDate: birthDate || null,
      genderInd: hashSeed(String(seed) + 'g') % 2 === 0 ? 'M' : 'F',
      enquiryId: `ENQ-${hashSeed(String(seed) + 'e').toString(16)}`,
      enquiryResultId: `RES-${hashSeed(String(seed) + 'r').toString(16)}`,
      reference: yourReference || null,
    };
  },
  async connectGetResult({ ticket, enquiryId, enquiryResultId }) {
    await sleep(jitter(300, 800));
    if (!ticket || !enquiryId || !enquiryResultId) throw new Error('Invalid enquiry reference');
    return buildMockReport(enquiryId, {});
  },
};

// ─── Live adapter (stub only) ───────────────────────────────────────────────
// TODO before switching CREDIT_CHECK_MODE=live:
//   - Bind XDS_ENDPOINT, XDS_USERNAME, XDS_PASSWORD as Secret-Manager-bound
//     env vars (see functions/index.js's `secrets: [...]` array for the
//     binding pattern already used by TOTP_ENCRYPTION_KEY).
//   - login(): POST a SOAP 1.2 envelope to XDS_ENDPOINT's Login operation
//     with XDS_USERNAME/XDS_PASSWORD; the ticket comes back inside a
//     CDATA-wrapped inner XML string nested in the SOAP body — needs an XML
//     parser (fast-xml-parser or xml2js) run twice: once for the outer SOAP
//     envelope, once for the CDATA payload it contains.
//   - isTicketValid(): same SOAP+CDATA shape, IsTicketValid operation.
//   - connectConsumerMatch(): ConnectConsumerMatch operation, productId 15,
//     enquiryReason required by XDS's contract — map this module's
//     idNumber/passportNo/firstName/surname/birthDate/yourReference params
//     into the request envelope's fields.
//   - connectGetResult(): ConnectGetResult operation; response XML is
//     considerably larger (the full report) — same double-parse pattern,
//     then map XDS's field names onto this module's buildMockReport() shape
//     so callers never need to know which adapter produced the data.
const liveAdapter = {
  async login() { throw new Error('XDS live mode not configured — see services/creditCheck.js TODOs'); },
  async isTicketValid() { throw new Error('XDS live mode not configured — see services/creditCheck.js TODOs'); },
  async connectConsumerMatch() { throw new Error('XDS live mode not configured — see services/creditCheck.js TODOs'); },
  async connectGetResult() { throw new Error('XDS live mode not configured — see services/creditCheck.js TODOs'); },
};

let _warnedMock = false;
function activeAdapter() {
  const mode = (process.env.CREDIT_CHECK_MODE || 'mock').toLowerCase();
  if (mode === 'live') return liveAdapter;
  if (!_warnedMock) {
    console.warn('[creditCheck] CREDIT_CHECK_MODE not set to "live" — using the mock XDS adapter.');
    _warnedMock = true;
  }
  return mockAdapter;
}

// Runs the full 4-step chain for one rental application and returns
// { score, band, report } — report is the full XDS-shaped consumer report.
// Only `score` is persisted to RentalApplication.creditCheckScore; `report`
// is NOT stored anywhere (this schema has no column for it) — callers that
// need to redisplay it later just re-run this, which is safe because every
// mock value is deterministic per applicant identity, not randomised per call.
async function runCheck(applicationId) {
  const adapter = activeAdapter();
  const data = await runQuery('GetRentalApplicationById', { id: applicationId });
  const app = data.rentalApplication;
  if (!app) throw new Error('Application not found');

  const { ticket } = await adapter.login(process.env.XDS_USERNAME || 'mock-user', process.env.XDS_PASSWORD || 'mock-pwd');
  const valid = await adapter.isTicketValid(ticket);
  if (!valid) throw new Error('Credit bureau session could not be established');

  const match = await adapter.connectConsumerMatch({
    ticket, productId: PRODUCT_ID, enquiryReason: 'Rental application',
    idNumber: app.idNumber, firstName: app.firstName, surname: app.lastName,
    birthDate: app.dateOfBirth, yourReference: app.ref,
  });

  const report = await adapter.connectGetResult({
    ticket, enquiryId: match.enquiryId, enquiryResultId: match.enquiryResultId, productId: PRODUCT_ID,
  });
  // The mock adapter's report doesn't know the applicant's name (only
  // connectConsumerMatch does) — fill it in from the match here, same as a
  // live adapter's ConnectGetResult response would already include it.
  report.consumer = {
    ...report.consumer,
    firstName: match.firstName, surname: match.surname,
    idNo: match.idNo, passportNo: match.passportNo, birthDate: match.birthDate, genderInd: match.genderInd,
  };

  return { score: report.score, band: report.riskBand, report };
}

module.exports = { runCheck };
