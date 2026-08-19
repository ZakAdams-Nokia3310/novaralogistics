'use strict';
// EquipCore — Security Module v2
// Must be loaded BEFORE auth.js on every page.

const EC_SECURITY = (() => {

  // ── Constants ──────────────────────────────────────────────────────────────
  const LOGIN_MAX_ATTEMPTS = 5;
  const LOGIN_LOCKOUT_MS   = 15 * 60 * 1000;   // 15 minutes
  const RATE_WINDOW_MS     = 60 * 1000;          // 1 minute
  const RATE_MAX_CALLS     = 100;                // per window
  const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

  // Exponential backoff caps per login context
  const BACKOFF_BASE_MS = 2000;
  const BACKOFF_CAP_MS  = 30000;

  const K = {
    LOCKOUT    : 'ec_lockout',
    ATTEMPTS   : 'ec_attempts',
    RATE       : 'ec_rate',
    AUDIT      : 'ec_audit',
    SESSION_TS : 'ec_session_ts',
    CSRF       : 'ec_csrf',
    CONSENT    : 'ec_cookie_consent',
  };

  // Pages open to unauthenticated visitors
  // NOTE: keys are extensionless (clean URLs — see firebase.json's
  // "cleanUrls" and server.js) and must match location.pathname.split('/').pop().
  // No guest/anonymous browsing anywhere in the product — every page that
  // touches real inventory or rental data requires a signed-in account.
  const PUBLIC_PAGES = new Set([
    '', 'index', 'login', 'signup', 'about', 'contact',
    'calculator', 'dashboard', 'privacy', 'terms',
  ]);

  const PAGE_ROLES = {
    'dashboard-admin'   : ['admin'],
    'admin-rentals'     : ['admin'],
    'admin-fleet'       : ['admin'],
    'admin-maintenance' : ['admin'],
    'admin-orgs'        : ['admin'],
    'admin-audit'       : ['admin'],
    'admin-roles'       : ['admin'],
    'admin-reports'     : ['admin'],
    'add-vehicle'       : ['admin'],
    'dashboard-user'    : ['user'],
    'user-dashboard'    : ['user'],
    'my-rentals'        : ['user', 'driver', 'admin'],
    'dashboard-driver'  : ['driver'],
    'driver-vehicles'   : ['driver', 'admin'],
    'messages'          : ['admin', 'user', 'driver'],
    'vehicle-detail'    : ['admin'],
    'rental-detail'     : ['admin'],
    'profile'           : ['admin', 'user', 'driver'],
    'apply-rental'      : ['admin', 'user', 'driver'],
    'rent-equipment'    : ['admin', 'user', 'driver'],
    'marketplace'       : ['admin', 'user', 'driver'],
  };

  // ── Cryptographically secure random ───────────────────────────────────────

  function secureRandHex(bytes) {
    const arr = new Uint8Array(bytes);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }

  function secureRandInt(min, max) {
    const range  = max - min;
    const arr    = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return min + (arr[0] % range);
  }

  function secureId() {
    return secureRandHex(16);
  }

  // ── CSRF token ─────────────────────────────────────────────────────────────
  // Protects against CSRF in any future server-submitted forms.
  // For a pure SPA this is defence-in-depth; fully effective once httpOnly
  // cookie sessions are in place.

  function getCSRFToken() {
    let token = sessionStorage.getItem(K.CSRF);
    if (!token) {
      token = secureRandHex(32);
      sessionStorage.setItem(K.CSRF, token);
    }
    return token;
  }

  function injectCSRFField(formEl) {
    if (!formEl) return;
    let input = formEl.querySelector('[name="_csrf"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = '_csrf';
      formEl.appendChild(input);
    }
    input.value = getCSRFToken();
  }

  function verifyCSRF(token) {
    return token === sessionStorage.getItem(K.CSRF);
  }

  // ── Honeypot detection ─────────────────────────────────────────────────────

  function isHoneypotTripped(formEl) {
    if (!formEl) return false;
    const hpInputs = formEl.querySelectorAll('[data-honeypot]');
    for (const inp of hpInputs) {
      if (inp.value !== '') {
        _audit('HONEYPOT_TRIGGERED', { fieldName: inp.name || inp.id });
        return true;
      }
    }
    return false;
  }

  // ── Sanitisation ───────────────────────────────────────────────────────────

  function sanitizeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  function stripTags(str) {
    return String(str == null ? '' : str).replace(/<[^>]*>/g, '').trim();
  }

  // Every deliberate, human-authored error this app throws (auth.js's
  // login/signup/2FA flows, etc.) is a plain `new Error('...')` with
  // user-safe text and NO .code property. Anything else — a TypeError from
  // a real bug, a stale-cache "X is not a function", or (the case that
  // actually mattered: Firebase's own compat SDK, which builds its auth
  // errors as plain `Error` instances too, just with a .code like
  // "auth/unauthorized-domain" attached — so checking the constructor alone
  // doesn't distinguish "mine" from "theirs") — is NOT meant for a user's
  // screen. .code is the reliable signal: our own throws never set it,
  // every SDK/library error does. Callers should use this instead of
  // trusting err.message directly.
  function safeErrMsg(err, fallback) {
    if (err && !err.code && err.constructor === Error && typeof err.message === 'string' && err.message) {
      return err.message;
    }
    return fallback;
  }

  // For DB-sourced values interpolated into an inline onclick="fn('${...}')"
  // JS-string argument (not plain HTML text — sanitizeHtml alone isn't
  // enough there): first JS-escapes so the value can't break out of the
  // single-quoted JS string, THEN HTML-attribute-escapes the result so the
  // browser's HTML parser can't break out of the onclick="..." attribute
  // itself. The browser HTML-decodes the attribute before handing it to the
  // JS parser, so this order (JS-escape, then HTML-escape) is what survives
  // both parsing stages intact.
  function escJsAttr(str) {
    const jsEscaped = String(str == null ? '' : str)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
    return sanitizeHtml(jsEscaped);
  }

  function sanitizeInput(value, type) {
    const v = stripTags(value);
    switch (type) {
      case 'email'    : return v.toLowerCase().slice(0, 200);
      case 'phone'    : return v.replace(/[^\d\s+()\-]/g, '').slice(0, 30);
      case 'idNumber' : return v.replace(/\D/g, '').slice(0, 20);
      case 'name'     : return v.replace(/[<>{}[\]|\\^`~]/g, '').slice(0, 200);
      case 'number'   : return v.replace(/[^\d.\-]/g, '');
      case 'date'     : return v.replace(/[^\d\-/]/g, '').slice(0, 10);
      case 'alphaNum' : return v.replace(/[^a-zA-Z0-9\s\-_]/g, '').slice(0, 100);
      case 'url'      : return v.startsWith('https://') ? v.slice(0, 500) : '';
      default         : return v.slice(0, 1000);
    }
  }

  // ── Sensitive data masking ─────────────────────────────────────────────────

  function maskId(idNumber) {
    const s = String(idNumber || '');
    if (s.length < 4) return '****';
    return '*'.repeat(s.length - 4) + s.slice(-4);
  }

  function maskEmail(email) {
    const [local, domain] = String(email || '').split('@');
    if (!domain) return '****';
    const shown = local.length > 2 ? local[0] + '*'.repeat(local.length - 2) + local.slice(-1) : '**';
    return shown + '@' + domain;
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  function isValidEmail(v) {
    return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;
  }

  // 8+ chars, at least one letter and one number — deliberately not
  // demanding symbols/mixed-case too (that tends to push users toward
  // predictable substitutions like "Password1!" without real entropy gain);
  // length is the strongest lever, so it's weighted at 8 instead of Firebase
  // Auth's own bare 6-char minimum.
  function isStrongPassword(v) {
    const s = String(v || '');
    return s.length >= 8 && /[A-Za-z]/.test(s) && /\d/.test(s);
  }

  function isValidPhone(v) {
    return typeof v === 'string' && /^[\d\s+()\-]{7,30}$/.test(v);
  }

  function isValidSAId(v) {
    if (!/^\d{13}$/.test(v)) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let d = parseInt(v[i], 10);
      if (i % 2 !== 0) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    return (10 - (sum % 10)) % 10 === parseInt(v[12], 10);
  }

  function isValidName(v) {
    return typeof v === 'string' && v.trim().length >= 2 && v.length <= 200;
  }

  function isValidDate(v) {
    if (!v) return false;
    const d = new Date(v);
    return !isNaN(d.getTime());
  }

  function isPositiveNumber(v) {
    const n = parseFloat(v);
    return !isNaN(n) && n >= 0;
  }

  function isDateAfter(a, b) {
    return new Date(a) > new Date(b);
  }

  function validateForm(fields) {
    const errors = [];
    fields.forEach(({ value, type, label, required }) => {
      const v = stripTags(value);
      if (required && !v) { errors.push(`${label} is required.`); return; }
      if (!v) return;
      switch (type) {
        case 'email'    : if (!isValidEmail(v))    errors.push(`${label} must be a valid email address.`); break;
        case 'phone'    : if (!isValidPhone(v))    errors.push(`${label} must be a valid phone number.`); break;
        case 'idNumber' : if (!isValidSAId(v))     errors.push(`${label} must be a valid 13-digit SA ID number.`); break;
        case 'name'     : if (!isValidName(v))     errors.push(`${label} must be at least 2 characters.`); break;
        case 'number'   : if (!isPositiveNumber(v))errors.push(`${label} must be a valid positive number.`); break;
        case 'date'     : if (!isValidDate(v))     errors.push(`${label} must be a valid date.`); break;
      }
    });
    return errors;
  }

  // ── Login lockout & exponential backoff ────────────────────────────────────

  function _getLockout() {
    try { return JSON.parse(localStorage.getItem(K.LOCKOUT)); } catch { return null; }
  }

  function _getAttempts() {
    try { return JSON.parse(localStorage.getItem(K.ATTEMPTS)) || { count: 0 }; } catch { return { count: 0 }; }
  }

  function isLockedOut() {
    const l = _getLockout();
    if (!l) return false;
    if (Date.now() >= l.until) {
      localStorage.removeItem(K.LOCKOUT);
      localStorage.removeItem(K.ATTEMPTS);
      return false;
    }
    return true;
  }

  function lockoutRemainingMs() {
    const l = _getLockout();
    return l ? Math.max(0, l.until - Date.now()) : 0;
  }

  // Returns the milliseconds the UI should wait before re-enabling submit
  // (exponential backoff before the full lockout kicks in)
  function backoffDelayMs(attemptCount) {
    if (attemptCount <= 1) return 0;
    return Math.min(BACKOFF_BASE_MS * Math.pow(2, attemptCount - 2), BACKOFF_CAP_MS);
  }

  function recordLoginAttempt(success) {
    if (success) {
      localStorage.removeItem(K.LOCKOUT);
      localStorage.removeItem(K.ATTEMPTS);
      return { ok: true };
    }
    const state = _getAttempts();
    state.count = (state.count || 0) + 1;

    if (state.count >= LOGIN_MAX_ATTEMPTS) {
      const until = Date.now() + LOGIN_LOCKOUT_MS;
      localStorage.setItem(K.LOCKOUT, JSON.stringify({ until }));
      localStorage.removeItem(K.ATTEMPTS);
      _audit('LOGIN_LOCKOUT', { failedAttempts: state.count });
      return { ok: false, attemptsLeft: 0, lockedUntil: until, backoffMs: 0 };
    }

    localStorage.setItem(K.ATTEMPTS, JSON.stringify(state));
    const attemptsLeft = LOGIN_MAX_ATTEMPTS - state.count;
    return { ok: false, attemptsLeft, lockedUntil: null, backoffMs: backoffDelayMs(state.count) };
  }

  // ── General rate limiting ──────────────────────────────────────────────────

  function checkRateLimit(context) {
    const key = K.RATE + '_' + (context || 'global');
    try {
      const raw   = sessionStorage.getItem(key);
      const state = raw ? JSON.parse(raw) : { calls: [] };
      const now   = Date.now();
      state.calls  = (state.calls || []).filter(t => now - t < RATE_WINDOW_MS);
      if (state.calls.length >= RATE_MAX_CALLS) {
        _audit('RATE_LIMIT_EXCEEDED', { context });
        return false;
      }
      state.calls.push(now);
      sessionStorage.setItem(key, JSON.stringify(state));
      return true;
    } catch { return true; }
  }

  // ── Session expiry ─────────────────────────────────────────────────────────

  function touchSession() {
    try { sessionStorage.setItem(K.SESSION_TS, String(Date.now())); } catch {}
  }

  function isSessionExpired() {
    const ts = sessionStorage.getItem(K.SESSION_TS);
    if (!ts) return false;
    return Date.now() - parseInt(ts, 10) > SESSION_MAX_AGE_MS;
  }

  function validateSessionObject(user) {
    if (!user || typeof user !== 'object') return false;
    if (!user.id || !user.name || !user.email || !user.role) return false;
    if (!['admin', 'super_admin', 'user', 'driver', 'guest'].includes(user.role)) return false;
    if (typeof user.email !== 'string' || !isValidEmail(user.email)) return false;
    if (isSessionExpired()) return false;
    return true;
  }

  // ── Custom-role edit/view distinction ───────────────────────────────────────
  // A base admin can always edit anything their role already gates. A
  // custom-role holder can only edit a page (Add/Edit/Delete/Approve/status
  // buttons etc.) when their role's grant for that page is specifically
  // "edit", not just "view" — call this to decide whether to show or hide
  // a page's mutating controls. UI convenience only, matching guardPage's
  // note above: the actual write is still rejected server-side regardless
  // of what this returns.
  // A custom role's per-feature grant is { view, create, edit } booleans as
  // of the modular-permissions rewrite — delete rides along with edit, not
  // its own flag (an admin explicitly asked for exactly that split: create
  // is independent, delete isn't). Roles saved before this UI existed still
  // have the old bare "view"/"edit" string instead of an object; normalized
  // here so both keep working without needing every existing role
  // re-saved. The actual enforcement of which specific action a grant
  // permits is server-side (dataController.js's matching normalizeGrant) —
  // this is read here purely to decide what the UI shows.
  function normalizeGrant(raw) {
    if (typeof raw === 'string') {
      return raw === 'edit' ? { view: true, create: true, edit: true }
           : raw === 'view' ? { view: true, create: false, edit: false }
           : { view: false, create: false, edit: false };
    }
    return { view: !!(raw && raw.view), create: !!(raw && raw.create), edit: !!(raw && raw.edit) };
  }

  // Blanket "show this page's mutating controls at all" gate — true if
  // create OR edit is granted. Pages with buttons that map to different
  // specific actions (e.g. an "Add Vehicle" button vs. a row's Edit/Delete)
  // don't yet individually distinguish create-only from edit-only here;
  // the server-side check is exact regardless, so a create-only role
  // clicking an edit-only control gets a clean rejection, not a security
  // gap — just a rougher edge than per-button gating would be.
  function canEdit(pageKey) {
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('ec_session') || 'null'); } catch {}
    if (!user) return false;
    // super_admin is a strict superset of admin everywhere — it never loses
    // a page-level capability admin has, it only gains the handful of
    // super-admin-exclusive actions (gated separately, see isSuperAdmin).
    if (user.role === 'admin' || user.role === 'super_admin') return true;
    const grant = normalizeGrant(user.permissions && user.permissions[pageKey]);
    return grant.create || grant.edit;
  }

  // Gate for the small set of actions restricted to the platform owner even
  // from other admins — creating organisations, approving org requests, and
  // suspending/reinstating orgs. Unlike canEdit, there is no custom-role
  // escape hatch here: a custom role can never grant this, matching the
  // server-side registry (functions/registry/dataOperations.js's
  // SUPER_ADMIN-only operations).
  function isSuperAdmin() {
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('ec_session') || 'null'); } catch {}
    return !!user && user.role === 'super_admin';
  }

  // Some pages aren't a feature page in their own right but a satellite of
  // one (add-vehicle.html is only reached from admin-fleet.html; vehicle
  // detail/rental detail are admin drill-down views) — a custom role's
  // grant on the owning feature also covers these. All three are
  // mutation-capable pages, so only an 'edit' grant (never bare 'view')
  // qualifies.
  const FEATURE_PAGE_ALIASES = {
    'add-vehicle'    : 'admin-fleet',
    'vehicle-detail' : 'admin-fleet',
    'rental-detail'  : 'admin-rentals',
  };

  // Single source of truth for "does this custom-role permissions object
  // grant access to this page" — used by guardPage() (page reachability)
  // and auth.js's EC_AUTH.require() (per-page role gate), so the two never
  // drift out of sync.
  function hasPageAccess(user, page) {
    if (!user || !user.permissions) return false;
    const own = normalizeGrant(user.permissions[page]);
    if (own.view || own.create || own.edit) return true;
    const alias = FEATURE_PAGE_ALIASES[page];
    if (!alias) return false;
    return normalizeGrant(user.permissions[alias]).edit;
  }

  // ── Page access guard ──────────────────────────────────────────────────────

  function guardPage() {
    const page = location.pathname.split('/').pop() || 'index';
    if (PUBLIC_PAGES.has(page)) return;

    const allowed = PAGE_ROLES[page];
    if (!allowed) return;

    let user = null;
    try {
      const raw = sessionStorage.getItem('ec_session');
      user = raw ? JSON.parse(raw) : null;
    } catch {}

    if (!validateSessionObject(user)) {
      if (sessionStorage.getItem('ec_session')) {
        sessionStorage.removeItem('ec_session');
        _audit('SESSION_EXPIRED_REDIRECT', { page });
      }
      location.href = 'login';
      return;
    }

    // A custom role (see dataconnect/schema/schema.gql's Role type) grants
    // page access on top of the base role — view or edit both count, since
    // this only decides whether the page can be OPENED at all; whether its
    // mutating controls are shown is a separate check (see canEdit below).
    // UI convenience only — the real gate is server-side, same as the base
    // role check above.
    // super_admin can open anything admin can, plus its own exclusive pages
    // — same superset relationship as canEdit above.
    const roleSatisfied = allowed.includes(user.role)
      || (user.role === 'super_admin' && allowed.includes('admin'));
    if (!roleSatisfied && !hasPageAccess(user, page)) {
      _audit('UNAUTHORIZED_ACCESS_ATTEMPT', { page, userRole: user.role, required: allowed });
      const dashMap = {
        admin: 'dashboard-admin', super_admin: 'dashboard-admin', user: 'dashboard-user',
        driver: 'dashboard-driver',
      };
      location.href = dashMap[user.role] || 'login';
      return;
    }

    touchSession();
  }

  // ── Inactivity logout ──────────────────────────────────────────────────────
  // Auto-logout after 30 minutes of no user interaction on protected pages.

  let _inactivityTimer = null;
  const INACTIVITY_MS = 30 * 60 * 1000;

  function _resetInactivityTimer() {
    clearTimeout(_inactivityTimer);
    _inactivityTimer = setTimeout(() => {
      const page = location.pathname.split('/').pop() || '';
      if (!PUBLIC_PAGES.has(page) && PAGE_ROLES[page]) {
        _audit('INACTIVITY_LOGOUT', { page });
        // Must actually sign out of Firebase, not just clear the local
        // sessionStorage mirror — otherwise the very next page load's
        // onIdTokenChanged handler (auth.js) silently re-authenticates from
        // the still-valid Firebase session and this "logout" never sticks.
        // EC_AUTH.logout() also revokes the refresh token server-side.
        if (typeof EC_AUTH !== 'undefined') {
          EC_AUTH.logout();
        } else {
          sessionStorage.removeItem('ec_session');
          sessionStorage.removeItem(K.SESSION_TS);
          location.href = 'login';
        }
      }
    }, INACTIVITY_MS);
  }

  function initInactivityWatcher() {
    const page = location.pathname.split('/').pop() || '';
    if (PUBLIC_PAGES.has(page) || !PAGE_ROLES[page]) return;
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt =>
      document.addEventListener(evt, _resetInactivityTimer, { passive: true })
    );
    _resetInactivityTimer();
  }

  // ── Audit logging ──────────────────────────────────────────────────────────

  function _audit(action, details) {
    try {
      const raw  = sessionStorage.getItem('ec_session');
      const user = raw ? JSON.parse(raw) : null;
      const entry = {
        id       : secureId(),
        ts       : new Date().toISOString(),
        userId   : user?.id    || null,
        userName : user?.name  || 'anonymous',
        userRole : user?.role  || 'anonymous',
        action,
        details  : details || {},
        page     : location.pathname.split('/').pop() || '',
      };
      const logs = _getAuditLogs();
      logs.unshift(entry);
      if (logs.length > 2000) logs.length = 2000;
      localStorage.setItem(K.AUDIT, JSON.stringify(logs));
    } catch {}
  }

  function _getAuditLogs(limit) {
    try {
      const logs = JSON.parse(localStorage.getItem(K.AUDIT) || '[]');
      return limit ? logs.slice(0, limit) : logs;
    } catch { return []; }
  }

  // ── Cookie consent ─────────────────────────────────────────────────────────

  function hasConsent() {
    return localStorage.getItem(K.CONSENT) === 'accepted';
  }

  function hasDeclined() {
    return localStorage.getItem(K.CONSENT) === 'declined';
  }

  function recordConsent(accepted) {
    localStorage.setItem(K.CONSENT, accepted ? 'accepted' : 'declined');
    _audit('COOKIE_CONSENT', { accepted });
  }

  // ── HTTPS enforcement ──────────────────────────────────────────────────────

  (function enforceHttps() {
    if (location.protocol === 'http:' &&
        location.hostname !== 'localhost' &&
        location.hostname !== '127.0.0.1') {
      location.replace('https:' + location.href.slice(5));
    }
  })();

  // ── Auto-guard + inactivity watcher on parse ───────────────────────────────
  guardPage();
  document.addEventListener('DOMContentLoaded', initInactivityWatcher);

  // Back/forward-cache restore: the browser can bring back a protected
  // page's exact frozen DOM/JS state (e.g. after logout, hitting Back)
  // without re-running any script on the page — guardPage() above only
  // ever ran once, at the original load. Re-running it here is what
  // actually catches "logged out in the meantime" on a bfcache restore;
  // without it the stale rendered page would sit on screen indefinitely.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) guardPage();
  });

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    // Crypto
    secureId,
    secureRandHex,
    secureRandInt,

    // CSRF
    getCSRFToken,
    injectCSRFField,
    verifyCSRF,

    // Honeypot
    isHoneypotTripped,

    // Sanitisation
    sanitizeHtml,
    escJsAttr,
    stripTags,
    sanitizeInput,
    safeErrMsg,

    // Masking
    maskId,
    maskEmail,

    // Validation
    isValidEmail,
    isStrongPassword,
    isValidPhone,
    isValidSAId,
    isValidName,
    isValidDate,
    isPositiveNumber,
    isDateAfter,
    validateForm,

    // Login lockout + backoff
    isLockedOut,
    lockoutRemainingMs,
    recordLoginAttempt,
    backoffDelayMs,

    // Rate limiting
    checkRateLimit,

    // Session
    touchSession,
    isSessionExpired,
    validateSessionObject,

    // Audit
    audit: _audit,
    getAuditLogs: _getAuditLogs,
    clearAuditLogs() { localStorage.removeItem(K.AUDIT); },

    // Cookie consent
    hasConsent,
    hasDeclined,
    recordConsent,

    // Guard
    guardPage,
    canEdit,
    isSuperAdmin,
    hasPageAccess,
    PAGE_ROLES,
    PUBLIC_PAGES,
  };

})();
