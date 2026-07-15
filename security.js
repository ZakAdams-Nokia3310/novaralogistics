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
  const PUBLIC_PAGES = new Set([
    '', 'index', 'login', 'about', 'contact',
    'catalog', 'marketplace', 'calculator',
    'dashboard-guest', 'dashboard', 'privacy',
  ]);

  const PAGE_ROLES = {
    'dashboard-admin'   : ['admin'],
    'admin-rentals'     : ['admin'],
    'admin-fleet'       : ['admin'],
    'admin-maintenance' : ['admin'],
    'admin-orgs'        : ['admin'],
    'admin-audit'       : ['admin'],
    'dashboard-user'    : ['user'],
    'user-dashboard'    : ['user'],
    'my-rentals'        : ['user', 'driver', 'admin'],
    'apply-rental'      : ['user', 'admin'],
    'dashboard-driver'  : ['driver'],
    'driver-vehicles'   : ['driver', 'admin'],
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
    if (!['admin', 'user', 'driver', 'guest'].includes(user.role)) return false;
    if (typeof user.email !== 'string' || !isValidEmail(user.email)) return false;
    if (isSessionExpired()) return false;
    return true;
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

    if (!allowed.includes(user.role)) {
      _audit('UNAUTHORIZED_ACCESS_ATTEMPT', { page, userRole: user.role, required: allowed });
      const dashMap = {
        admin: 'dashboard-admin', user: 'dashboard-user',
        driver: 'dashboard-driver', guest: 'dashboard-guest',
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
        sessionStorage.removeItem('ec_session');
        sessionStorage.removeItem(K.SESSION_TS);
        location.href = 'login';
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
    stripTags,
    sanitizeInput,

    // Masking
    maskId,
    maskEmail,

    // Validation
    isValidEmail,
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
    PAGE_ROLES,
    PUBLIC_PAGES,
  };

})();
