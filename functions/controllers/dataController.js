'use strict';

const crypto = require('crypto');
const admin = require('firebase-admin');
const REGISTRY = require('../registry/dataOperations');
const { runQuery, runMutation } = require('../services/dataConnect');
const { logEvent } = require('../services/auditLog');
const { SCHEMAS, PUBLIC_SCHEMAS, REGISTER_SELF_SCHEMA } = require('../validation/dataSchemas');
const { verifyTurnstile } = require('../services/turnstile');
const creditCheck = require('../services/creditCheck');
const { sendMail } = require('../services/email');
const { buildInvoicePdf } = require('../services/invoicePdf');

async function resolveOwnUserId(email) {
  const data = await runQuery('GetUserByEmail', { email });
  const row = data.users && data.users[0];
  return row ? row.id : null;
}

// Mirrors security.js's normalizeGrant exactly (client-side has no build
// step to share this from) — { view, create, edit } booleans per feature
// key, with backward-compatible reads of the old bare "view"/"edit" string
// a role saved before this rewrite still has. This is the side that
// actually matters: dataController.execute()'s use of it below is the real
// security boundary, not the client-side copy, which is UI convenience only.
function normalizeGrant(raw) {
  if (typeof raw === 'string') {
    return raw === 'edit' ? { view: true, create: true, edit: true }
         : raw === 'view' ? { view: true, create: false, edit: false }
         : { view: false, create: false, edit: false };
  }
  return { view: !!(raw && raw.view), create: !!(raw && raw.create), edit: !!(raw && raw.edit) };
}

// Delete isn't its own flag (folded into edit — see normalizeGrant's doc
// comment); every operation name in the registry consistently starts with
// its verb (Create/Update/Delete/Review/Approve/... , List/Get for reads),
// so the action a custom role needs is derived from that instead of
// annotating every single registry entry by hand.
function actionForOperation(name, kind) {
  if (kind === 'query') return 'view';
  if (name.startsWith('Create')) return 'create';
  return 'edit';
}

// Fire-and-forget, same reasoning as every other side effect in this file —
// a notification-write hiccup must never surface as a failure of the action
// that triggered it. Silently no-ops with no userId (e.g. a guest applicant
// with no account row — Notification.user is required, so there's nowhere
// to attach one).
async function createNotification(userId, type, title, body, linkPath) {
  if (!userId) return;
  try {
    await runMutation('CreateNotification', { userId, type, title, body, linkPath: linkPath || null });
  } catch (err) {
    console.error('[dataController] createNotification', err.message);
  }
}

// Creates the Firestore conversation messages.html/chat-client.js expect
// once a rental application is approved — firestore.rules' own comments
// say this is meant to happen "by the approval Cloud Function," which
// never existed. Guest applications (no applicantUserId, no account) have
// nobody to message, so those are silently skipped rather than erroring —
// this is a courtesy side effect of approval, not part of the core action,
// so a failure here must never fail the approval itself.
async function createConversationForApprovedApplication(applicationId, reviewerUid) {
  try {
    const data = await runQuery('GetRentalApplicationById', { id: applicationId });
    const app = data.rentalApplication;
    if (!app || !app.applicantUser) return;

    // User.firebaseUid is never actually populated anywhere in this app
    // (CreateUser/registerSelf never set it) — resolve it live from Auth
    // by email instead of trusting that column.
    let applicantUid;
    try {
      applicantUid = (await admin.auth().getUserByEmail(app.applicantUser.email)).uid;
    } catch {
      return; // no matching Auth account — nothing to create a conversation with
    }

    const db = admin.firestore();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const preview = `Your application for ${app.equipmentName} has been approved.`;
    const convoRef = await db.collection('conversations').add({
      organisationId: app.organisation?.id || null,
      organisationName: app.organisation?.name || null,
      customerUserId: applicantUid,
      customerName: `${app.firstName} ${app.lastName}`.trim(),
      customerEmail: app.email,
      rentalApplicationId: applicationId,
      participantUids: [reviewerUid, applicantUid],
      createdAt: now,
      lastMessageAt: now,
      lastMessagePreview: preview,
      lastMessageSenderId: 'system',
    });
    await convoRef.collection('messages').add({
      senderId: 'system',
      senderRole: 'system',
      text: `${preview} You can chat here about pickup, delivery, or any questions.`,
      sentAt: now,
      readBy: [],
    });
  } catch (err) {
    console.error('[dataController] createConversationForApprovedApplication', err.message);
  }
}

// Auto-creates the linked Rental once an application is approved (see
// dataconnect/schema/schema.gql's Rental.application doc comment) — this is
// what makes an approval immediately trackable end-to-end instead of
// requiring the admin to separately remember to "Add Rental" afterward.
// That manual flow (admin-rentals.html) is untouched and still exists for
// walk-in customers with no prior application. Same fire-and-forget
// reasoning as the Firestore side effect above: a failure here must never
// fail the approval itself, which has already succeeded by the time this
// runs.
// app.dailyRate/estimatedCost are set by an admin during review in
// principle, but nothing in this codebase ever actually provides that UI —
// apply-rental.html deliberately submits both as null (see its own comment:
// "an admin confirms pricing when reviewing the application"), and
// ReviewRentalApplication only ever touches status/reviewedBy/rejectionReason,
// never rate fields. Falling back to the linked Vehicle's own listed
// dailyRate (set via vehicle-detail.html's marketplace listing panel) means
// a real total is available today without needing that missing admin step
// built first. Prefers an explicit app.estimatedCost if one is ever
// actually set, for forward compatibility.
function computeRentalValue(app) {
  if (app.estimatedCost) return app.estimatedCost;
  const rate = (app.vehicle && app.vehicle.dailyRate) || app.dailyRate;
  if (!rate || !app.startDate || !app.endDate) return 0;
  const days = Math.max(1, Math.round((new Date(app.endDate) - new Date(app.startDate)) / 86400000));
  return rate * days;
}

async function createRentalForApprovedApplication(applicationId, reviewedById) {
  try {
    const data = await runQuery('GetRentalApplicationById', { id: applicationId });
    const app = data.rentalApplication;
    if (!app) return;

    const inserted = await runMutation('CreateRental', {
      vehicleId: app.vehicle?.id || null,
      equipmentName: app.equipmentName,
      clientName: `${app.firstName} ${app.lastName}`.trim(),
      organisationId: app.organisation?.id || null,
      startDate: app.startDate,
      returnDate: app.endDate,
      valueZar: computeRentalValue(app),
      status: 'PENDING',
      notes: null,
      applicationId,
    });
    // Data Connect's generated _insert mutations return { id: UUID }, not a
    // bare scalar (confirmed live — the bare-scalar assumption used
    // elsewhere in this codebase only ever went untested because every
    // other call site re-queries afterward instead of trusting this).
    const rentalId = inserted.rental_insert?.id || inserted.rental_insert;
    if (!rentalId) return;

    await runMutation('CreateRentalEvent', {
      rentalId,
      type: 'CREATED',
      description: `Rental created from approved application ${app.ref}.`,
      actorUserId: reviewedById || null,
    });

    if (app.applicantUser) {
      await createNotification(
        app.applicantUser.id, 'APPLICATION_STATUS',
        'Application approved',
        `Your application ${app.ref} for ${app.equipmentName} has been approved.`,
        'my-rentals',
      );
    }
    await emailInvoiceForApprovedApplication(app);
  } catch (err) {
    console.error('[dataController] createRentalForApprovedApplication', err.message);
  }
}

// Emails a confirmation + quote PDF to the applicant on approval — a no-op
// (skipped, logged) until SMTP is actually configured (see
// services/email.js), same fire-and-forget reasoning as everything else
// here. vehicleLabel is best-effort (a walk-in application with no matched
// Vehicle just omits it).
async function emailInvoiceForApprovedApplication(app) {
  try {
    if (!app.email) return;
    const dailyRate = (app.vehicle && app.vehicle.dailyRate) || app.dailyRate || null;
    const days = (app.startDate && app.endDate)
      ? Math.max(1, Math.round((new Date(app.endDate) - new Date(app.startDate)) / 86400000))
      : null;
    const clientName = `${app.firstName} ${app.lastName}`.trim();
    const pdfBuffer = await buildInvoicePdf({
      ref: app.ref,
      clientName,
      orgName: app.organisation?.name,
      equipmentName: app.equipmentName,
      vehicleLabel: app.vehicle ? `${app.vehicle.make} ${app.vehicle.model}` : null,
      startDate: app.startDate,
      returnDate: app.endDate,
      valueZar: computeRentalValue(app),
      dailyRate,
      days,
    });
    const html = `
      <p>Hi ${clientName || 'there'},</p>
      <p>Great news — your rental application <strong>${app.ref}</strong> for
      <strong>${app.equipmentName || 'your requested equipment'}</strong> has been <strong>approved</strong>.</p>
      <p>Your rental quote and confirmation is attached as a PDF, covering
      ${fmtEmailDate(app.startDate)} through ${fmtEmailDate(app.endDate)}.</p>
      <p>If anything looks wrong, reply to this email or contact your account administrator.</p>
      <p>— EquipCore, Novara Terra Industrials</p>
    `;
    await sendMail({
      to: app.email,
      subject: `Your rental has been approved — quote for ${app.ref}`,
      text: `Hi ${clientName || 'there'}, your rental application ${app.ref} for ${app.equipmentName || 'your requested equipment'} has been approved. Your rental quote and confirmation is attached.`,
      html,
      attachments: [{ filename: `quote-${app.ref}.pdf`, content: pdfBuffer }],
    });
  } catch (err) {
    console.error('[dataController] emailInvoiceForApprovedApplication', err.message);
  }
}

function fmtEmailDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Logs a STATUS_CHANGED RentalEvent when UpdateRentalStatus/UpdateRental
// actually changes .status — needs the PRIOR status, which the mutation
// itself doesn't return, hence the fetch-before-write. Fire-and-forget for
// the same reason as the two side effects above: the status change has
// already succeeded by the time this runs, and a timeline-logging hiccup
// must never be reported back as a failure of that.
async function logRentalStatusChangeIfNeeded(rentalId, newStatus, actorEmail, priorStatus) {
  try {
    if (!newStatus || priorStatus === newStatus) return;
    const actorUserId = await resolveOwnUserId(actorEmail);
    await runMutation('CreateRentalEvent', {
      rentalId,
      type: 'STATUS_CHANGED',
      description: `Status changed from ${priorStatus} to ${newStatus}.`,
      fromStatus: priorStatus,
      toStatus: newStatus,
      actorUserId: actorUserId || null,
    });

    // Best-effort: only rentals auto-created from an application have a
    // known renter (Rental.clientName is just a free-text string, not a
    // User FK) — a manually added walk-in rental has nobody to notify.
    try {
      const rentalData = await runQuery('GetRentalById', { id: rentalId });
      const applicantId = rentalData.rental?.application?.applicantUser?.id;
      if (applicantId) {
        await createNotification(
          applicantId, 'RENTAL_STATUS',
          'Rental status updated',
          `Your rental status changed from ${priorStatus.toLowerCase()} to ${newStatus.toLowerCase()}.`,
          'my-rentals',
        );
      }
    } catch { /* best effort */ }
  } catch (err) {
    console.error('[dataController] logRentalStatusChangeIfNeeded', err.message);
  }
}

// Notifies an applicant their application was rejected (approval's own
// notification lives inline in createRentalForApprovedApplication above,
// alongside the other approval side effects).
async function notifyApplicationRejected(applicationId, rejectionReason) {
  try {
    const data = await runQuery('GetRentalApplicationById', { id: applicationId });
    const app = data.rentalApplication;
    if (!app || !app.applicantUser) return;
    await createNotification(
      app.applicantUser.id, 'APPLICATION_STATUS',
      'Application declined',
      rejectionReason
        ? `Your application ${app.ref} for ${app.equipmentName} was declined: ${rejectionReason}`
        : `Your application ${app.ref} for ${app.equipmentName} was declined.`,
      'my-rentals',
    );
  } catch (err) {
    console.error('[dataController] notifyApplicationRejected', err.message);
  }
}

// Notifies an applicant of a credit-check state change (requested/completed/
// declined) — mirrors the shape of every other notify* helper above.
async function notifyCreditCheckEvent(applicationId, kind) {
  try {
    const data = await runQuery('GetRentalApplicationById', { id: applicationId });
    const app = data.rentalApplication;
    if (!app || !app.applicantUser) return;
    const messages = {
      REQUESTED: `A credit check has been requested for your application ${app.ref}.`,
      COMPLETED: `Your credit check for application ${app.ref} is complete.`,
      DECLINED: `The credit check for your application ${app.ref} was declined by an admin.`,
    };
    await createNotification(
      app.applicantUser.id, 'CREDIT_CHECK',
      'Credit check update', messages[kind] || messages.COMPLETED, 'my-rentals',
    );
  } catch (err) {
    console.error('[dataController] notifyCreditCheckEvent', err.message);
  }
}

// Notifies + emails the request's author that a new quote has come in.
async function notifyQuoteReceived(requestId) {
  try {
    const data = await runQuery('GetEquipmentRequestById', { id: requestId });
    const request = data.equipmentRequest;
    if (!request || !request.requestedBy) return;
    await createNotification(
      request.requestedBy.id, 'QUOTE_RECEIVED',
      'New quote received',
      'You received a new quote for your equipment request.',
      'my-requests',
    );
    if (request.requestedBy.email) {
      await sendMail({
        to: request.requestedBy.email,
        subject: 'You received a new quote for your equipment request',
        text: `Hi ${request.requestedBy.name || 'there'}, you received a new quote for your equipment request. Sign in to review it.`,
        html: `<p>Hi ${request.requestedBy.name || 'there'},</p><p>You received a new quote for your equipment request. Sign in to review it and accept if it works for you.</p><p>— EquipCore, Novara Terra Industrials</p>`,
      });
    }
  } catch (err) {
    console.error('[dataController] notifyQuoteReceived', err.message);
  }
}

// Awards the request and notifies + emails the winning supplier — the
// EquipmentRequest status flip lives here (server-internal
// UpdateEquipmentRequestStatus, never client-reachable) rather than being a
// second client-orchestrated call, since both must happen together or not
// at all and there's no legitimate reason for a client to award a request
// without accepting a specific quote.
async function acceptQuoteSideEffects(quoteId) {
  try {
    const data = await runQuery('GetQuoteById', { id: quoteId });
    const quote = data.quote;
    if (!quote) return;
    await runMutation('UpdateEquipmentRequestStatus', { id: quote.request.id, status: 'AWARDED' });
    if (quote.submittedBy) {
      await createNotification(
        quote.submittedBy.id, 'QUOTE_ACCEPTED',
        'Your quote was accepted',
        'Your quote has been accepted — coordinate the rental details with the requester.',
        'open-requests#my-quotes',
      );
      if (quote.submittedBy.email) {
        await sendMail({
          to: quote.submittedBy.email,
          subject: 'Your quote was accepted',
          text: `Hi ${quote.submittedBy.name || 'there'}, your quote has been accepted. Please coordinate the rental details with the requester.`,
          html: `<p>Hi ${quote.submittedBy.name || 'there'},</p><p>Your quote has been accepted. Please coordinate the rental details with the requester.</p><p>— EquipCore, Novara Terra Industrials</p>`,
        });
      }
    }
  } catch (err) {
    console.error('[dataController] acceptQuoteSideEffects', err.message);
  }
}

// Generic proxy for every registered admin/self-service Data Connect
// operation. The Data Connect connector itself refuses these to every
// client (@auth(level: NO_ACCESS)) — this handler, not the GraphQL layer,
// is what decides who may call what (see registry/dataOperations.js).
exports.execute = async (req, res) => {
  const { operationName, variables } = req.body || {};
  const op = typeof operationName === 'string' ? REGISTRY[operationName] : null;
  if (!op) {
    return res.status(404).json({ error: 'Unknown operation' });
  }

  const schema = SCHEMAS[operationName];
  const parsed = schema ? schema.safeParse(variables || {}) : { success: true, data: variables || {} };
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) });
  }

  const role = req.user.role;
  const effectiveVariables = { ...parsed.data };
  let authorized = op.roles.includes(role);

  if (!authorized && op.ownField) {
    const targetId = effectiveVariables[op.ownField];
    if (targetId) {
      try {
        const ownId = await resolveOwnUserId(req.user.email);
        authorized = !!ownId && ownId === targetId;
      } catch {
        authorized = false;
      }
    }
  }

  if (!authorized && op.orgRoles && op.orgRoles.includes(role)) {
    // The client's requested org is irrelevant here — always overridden
    // with the caller's own orgId claim, so this can't be used to read
    // another organisation's data regardless of what was sent.
    if (req.user.orgId) {
      effectiveVariables[op.orgField] = req.user.orgId;
      authorized = true;
    }
  }

  // Custom-role fallback (see registry/dataOperations.js's featureKey doc
  // comment) — always a fresh DB read of the role's CURRENT permissions,
  // never trusted from the claim, so editing/revoking a role takes effect
  // on the caller's very next request, not just their next token refresh.
  if (!authorized && op.featureKey && req.user.customRoleId) {
    try {
      const roleData = await runQuery('GetRoleById', { id: req.user.customRoleId });
      const permissions = roleData.role ? JSON.parse(roleData.role.permissions || '{}') : {};
      const grant = normalizeGrant(permissions[op.featureKey]);
      authorized = !!grant[actionForOperation(operationName, op.kind)];
    } catch {
      authorized = false;
    }
  }

  if (!authorized) {
    await logEvent(req, 'DATA_ACCESS_DENIED', { operationName });
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Same principle as orgField above: some mutations record *who acted*
  // (e.g. ReviewRentalApplication's reviewedById) — that must be the
  // caller's own resolved row id, never a client-supplied uid, or any
  // admin could attribute an action to a different admin.
  if (op.injectOwnIdAs) {
    const ownId = await resolveOwnUserId(req.user.email);
    if (!ownId) {
      await logEvent(req, 'DATA_ACCESS_DENIED', { operationName, reason: 'no-own-user-row' });
      return res.status(403).json({ error: 'Forbidden' });
    }
    effectiveVariables[op.injectOwnIdAs] = ownId;
  }

  // Needs the rental's CURRENT status before it's overwritten below, to log
  // an accurate from/to RentalEvent afterward — the mutation itself doesn't
  // return the prior value, so this has to happen first. Best-effort: if
  // this lookup fails, logRentalStatusChangeIfNeeded below just no-ops
  // (falsy priorStatus never equals the new one, but the event would be
  // missing an accurate "from" — acceptable degradation for a fire-and-
  // forget timeline entry, never worth failing the actual status update over).
  let priorRentalStatus;
  if (operationName === 'UpdateRentalStatus' || operationName === 'UpdateRental') {
    try {
      const before = await runQuery('GetRentalById', { id: effectiveVariables.id });
      priorRentalStatus = before.rental ? before.rental.status : undefined;
    } catch { /* best effort */ }
  }

  // Approving an application before its credit check is resolved would
  // silently skip the workflow the credit-check feature exists for — this
  // is enforced here, not just via the disabled Approve button client-side.
  // Rejecting is unaffected: an admin may decline an applicant outright
  // without ever spending the R250 credit-check fee.
  if (operationName === 'ReviewRentalApplication' && effectiveVariables.status === 'APPROVED') {
    try {
      const current = await runQuery('GetRentalApplicationById', { id: effectiveVariables.id });
      const ccStatus = current.rentalApplication?.creditCheckStatus;
      if (ccStatus !== 'COMPLETED' && ccStatus !== 'DECLINED') {
        return res.status(400).json({ error: 'Resolve the credit check (complete or decline it) before approving this application.' });
      }
    } catch (err) {
      console.error('[dataController] credit-check approval gate', err.message);
      return res.status(500).json({ error: 'Unable to complete request' });
    }
  }

  // CompleteMockCreditCheck's score must be server-computed, never
  // trusted from the client (the schema only checks it's a plausible int,
  // not that it's genuine) — see services/creditCheck.js. Overwrites
  // whatever the client sent before the mutation runs. The full report
  // isn't persisted anywhere (this schema only has a creditCheckScore
  // column) — it's forwarded to the client below so admin-rentals.html can
  // show it without a second round trip; re-opening "View Credit Check"
  // later just calls this same mutation again, which is safe because the
  // mock adapter's report is deterministic per applicant, not randomised.
  let creditCheckReport = null;
  if (operationName === 'CompleteMockCreditCheck') {
    try {
      const result = await creditCheck.runCheck(effectiveVariables.id);
      effectiveVariables.score = result.score;
      creditCheckReport = result.report;
    } catch (err) {
      console.error('[dataController] creditCheck.runCheck', err.message);
      return res.status(500).json({ error: 'Unable to complete request' });
    }
  }

  // MarkNotificationRead has no ownField (a notification's own id isn't the
  // owning user's id — see registry/dataOperations.js's comment) — verify
  // ownership here instead, the same fetch-then-verify shape as the
  // credit-check approval gate above.
  if (operationName === 'MarkNotificationRead') {
    try {
      const ownId = await resolveOwnUserId(req.user.email);
      const current = await runQuery('GetNotificationById', { id: effectiveVariables.id });
      if (!current.notification || !ownId || current.notification.user.id !== ownId) {
        await logEvent(req, 'DATA_ACCESS_DENIED', { operationName, reason: 'not-own-notification' });
        return res.status(403).json({ error: 'Forbidden' });
      }
    } catch (err) {
      console.error('[dataController] MarkNotificationRead ownership check', err.message);
      return res.status(500).json({ error: 'Unable to complete request' });
    }
  }

  // ListQuotesForRequest/AcceptQuote: neither operation's id is the owning
  // user's id (a request's id isn't a user id, and a quote's id belongs to
  // the SUPPLIER who submitted it, not the requester deciding whether to
  // accept it) — same fetch-then-verify shape as MarkNotificationRead above.
  // Only the underlying EquipmentRequest's own requestedBy may do either.
  if (operationName === 'ListQuotesForRequest') {
    try {
      const ownId = await resolveOwnUserId(req.user.email);
      const current = await runQuery('GetEquipmentRequestById', { id: effectiveVariables.requestId });
      if (!current.equipmentRequest || !ownId || current.equipmentRequest.requestedBy.id !== ownId) {
        await logEvent(req, 'DATA_ACCESS_DENIED', { operationName, reason: 'not-own-request' });
        return res.status(403).json({ error: 'Forbidden' });
      }
    } catch (err) {
      console.error('[dataController] ListQuotesForRequest ownership check', err.message);
      return res.status(500).json({ error: 'Unable to complete request' });
    }
  }
  if (operationName === 'AcceptQuote') {
    try {
      const ownId = await resolveOwnUserId(req.user.email);
      const current = await runQuery('GetQuoteById', { id: effectiveVariables.id });
      if (!current.quote || !ownId || current.quote.request.requestedBy.id !== ownId) {
        await logEvent(req, 'DATA_ACCESS_DENIED', { operationName, reason: 'not-own-request' });
        return res.status(403).json({ error: 'Forbidden' });
      }
      if (current.quote.status !== 'PENDING' || current.quote.request.status !== 'OPEN') {
        return res.status(400).json({ error: 'This request has already been awarded or is no longer open.' });
      }
    } catch (err) {
      console.error('[dataController] AcceptQuote ownership check', err.message);
      return res.status(500).json({ error: 'Unable to complete request' });
    }
  }

  try {
    const data = op.kind === 'query'
      ? await runQuery(operationName, effectiveVariables)
      : await runMutation(operationName, effectiveVariables);
    if (op.kind === 'mutation') {
      await logEvent(req, 'DATA_MUTATION', { operationName });
    }
    if (operationName === 'ReviewRentalApplication' && effectiveVariables.status === 'APPROVED') {
      // Fire-and-forget: a Firestore/chat hiccup or timeline-logging hiccup
      // must never fail the approval itself, which already succeeded above.
      createConversationForApprovedApplication(effectiveVariables.id, req.user.id);
      createRentalForApprovedApplication(effectiveVariables.id, effectiveVariables.reviewedById);
    }
    if (operationName === 'ReviewRentalApplication' && effectiveVariables.status === 'REJECTED') {
      notifyApplicationRejected(effectiveVariables.id, effectiveVariables.rejectionReason);
    }
    if (operationName === 'RequestCreditCheck') {
      notifyCreditCheckEvent(effectiveVariables.id, 'REQUESTED');
    }
    if (operationName === 'CompleteMockCreditCheck') {
      notifyCreditCheckEvent(effectiveVariables.id, 'COMPLETED');
    }
    if (operationName === 'DeclineCreditCheck') {
      notifyCreditCheckEvent(effectiveVariables.id, 'DECLINED');
    }
    if (operationName === 'SubmitQuote') {
      notifyQuoteReceived(effectiveVariables.requestId);
    }
    if (operationName === 'AcceptQuote') {
      // Ownership + status were already verified above the try block —
      // this just fans the acceptance out: award the request and notify
      // the winning supplier. Fire-and-forget, same guarantee as every
      // other side effect here — a notify/email hiccup must never surface
      // as a failure of the accept action itself, which already succeeded.
      acceptQuoteSideEffects(effectiveVariables.id);
    }
    if (operationName === 'UpdateRentalStatus' || operationName === 'UpdateRental') {
      logRentalStatusChangeIfNeeded(effectiveVariables.id, effectiveVariables.status, req.user.email, priorRentalStatus);
    }
    res.status(200).json(creditCheckReport ? { data, creditCheckReport } : { data });
  } catch (err) {
    console.error('[dataController] execute', operationName, err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};

// Self-registration — called once, right after Firebase Auth signup,
// before any database row exists for the new account yet. Deliberately
// NOT in the generic registry above: role and organisationId are
// hardcoded here, never taken from the client, so this can never be used
// to self-grant anything beyond a bare USER account with no organisation.
// (Mirrors the "no self-granted role" rule authController.js's setRole
// already enforces for Firebase custom claims.)
exports.registerSelf = async (req, res) => {
  const parsed = REGISTER_SELF_SCHEMA.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) });
  }
  // Not just a client-side gate — an account can't be created at all
  // without this being true, same principle as DeclineCreditCheck's
  // acknowledged: z.literal(true).
  if (!parsed.data.termsAccepted) {
    return res.status(400).json({ error: 'You must accept the Terms & Conditions and Privacy Policy to create an account.' });
  }
  const { termsAccepted, ...profile } = parsed.data;

  try {
    await runMutation('CreateUser', {
      ...profile,
      email: req.user.email,
      role: 'USER',
      organisationId: null,
      avatarUrl: null,
      // Server-stamped, never client-supplied — see REGISTER_SELF_SCHEMA's
      // doc comment.
      termsAcceptedAt: new Date().toISOString(),
    });
    const data = await runQuery('GetUserByEmail', { email: req.user.email });
    await logEvent(req, 'SELF_REGISTER_DB_ROW', {});
    res.status(200).json({ user: (data.users && data.users[0]) || null });
  } catch (err) {
    console.error('[dataController] registerSelf', err.message);
    res.status(500).json({ error: 'Unable to complete registration' });
  }
};

// Self-service account deletion — deliberately NOT in the generic registry,
// same reasoning as registerSelf above: the target id is resolved from the
// caller's own verified token (a client could never pass someone else's id
// here even if it tried), and the anonymized replacement email is generated
// here, never accepted from the client, so it can't be aimed at a chosen
// address or collide with a real one.
exports.deleteOwnAccount = async (req, res) => {
  const reason = String((req.body && req.body.reason) || '').trim().slice(0, 1000);
  if (!reason) {
    return res.status(400).json({ error: 'Please tell us why you’re deleting your account.' });
  }
  try {
    const ownId = await resolveOwnUserId(req.user.email);
    if (!ownId) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const anonymizedEmail = `deleted-${crypto.randomUUID()}@deleted.local`;
    await runMutation('DeleteOwnAccount', { id: ownId, reason, anonymizedEmail });
    await logEvent(req, 'ACCOUNT_SELF_DELETED', { reason });
    // Best-effort — the DB row is already correctly anonymized/marked
    // DELETED regardless of whether this succeeds. Without it, the old
    // Firebase Auth account (real email) would otherwise still exist and
    // block that address from ever signing up fresh again, even though the
    // DB side has already freed it. Login stays blocked either way (the DB
    // lookup by the real email no longer finds a row), so a failure here is
    // degraded, not unsafe.
    try { await admin.auth().deleteUser(req.user.id); } catch (err) { console.error('[dataController] deleteOwnAccount: Firebase Auth cleanup failed:', err.message); }
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[dataController] deleteOwnAccount', err.message);
    res.status(500).json({ error: 'Unable to delete account' });
  }
};

// Anonymous-submission forms (org registration, rental application,
// waitlist join, contact inquiry) — deliberately reachable without signing
// in, so there is no req.user and no role/ownership check here at all.
// Server-side schema validation (PUBLIC_SCHEMAS) is the only gate between
// hostile input and the database for these; rate limiting is applied at
// the route level (see routes/dataRoutes.js).
exports.submitPublic = async (req, res) => {
  const { operationName, variables, turnstileToken } = req.body || {};
  const schema = typeof operationName === 'string' ? PUBLIC_SCHEMAS[operationName] : null;
  if (!schema) {
    return res.status(404).json({ error: 'Unknown operation' });
  }

  // No-op until TURNSTILE_SECRET_KEY is configured (see services/turnstile.js)
  // — kept outside the zod schema since turnstileToken isn't a data field.
  const humanVerified = await verifyTurnstile(turnstileToken, req.ip);
  if (!humanVerified) {
    await logEvent(req, 'BOT_CHECK_FAILED', { operationName });
    return res.status(400).json({ error: 'Verification failed. Please try again.' });
  }

  const parsed = schema.safeParse(variables || {});
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) });
  }

  try {
    const data = await runMutation(operationName, parsed.data);
    await logEvent(req, 'PUBLIC_SUBMIT', { operationName });
    if (operationName === 'CreateRentalApplication' && parsed.data.applicantUserId) {
      // Guest submissions (no applicantUserId) have no account to notify —
      // fire-and-forget, same reasoning as every other notify* helper.
      createNotification(
        parsed.data.applicantUserId, 'APPLICATION_STATUS',
        'Application submitted',
        `Your application ${parsed.data.ref} for ${parsed.data.equipmentName} has been submitted for review.`,
        'my-rentals',
      );
    }
    res.status(200).json({ data });
  } catch (err) {
    console.error('[dataController] submitPublic', operationName, err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};

// Looked up by email (not the generic registry, since the authorization
// rule here — "your own email, or any email if you're an admin" — doesn't
// fit the flat role/ownField shape used for everything else).
exports.getUserByEmail = async (req, res) => {
  const email = (req.query && req.query.email) || '';
  if (!email) return res.status(400).json({ error: 'email is required' });
  const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';
  if (!isAdmin && email.toLowerCase() !== (req.user.email || '').toLowerCase()) {
    await logEvent(req, 'DATA_ACCESS_DENIED', { operationName: 'GetUserByEmail' });
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const data = await runQuery('GetUserByEmail', { email });
    res.status(200).json({ user: (data.users && data.users[0]) || null });
  } catch (err) {
    console.error('[dataController] getUserByEmail', err.message);
    res.status(500).json({ error: 'Unable to complete request' });
  }
};
