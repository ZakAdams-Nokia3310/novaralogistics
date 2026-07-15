'use strict';
// EquipCore — API Token Client
//
// Wraps EC_AUTH.login/signup/logout to mint and clear a short-lived JWT
// from the backend auth API (see /backend). Purely additive: every call
// here fails silently if the backend is unreachable, so the existing
// demo auth flow in auth.js is completely unaffected when no backend is
// running (e.g. the static-only Firebase Hosting deployment today).
//
// Load order: security.js, then auth.js, then this file.

const EC_TOKEN = (() => {
  const BACKEND_URL = window.EC_BACKEND_URL || 'http://localhost:3001';
  const K = { ACCESS: 'ec_access_token', REFRESH: 'ec_refresh_token', EXP: 'ec_access_exp' };

  function store(accessToken, refreshToken, expiresIn) {
    sessionStorage.setItem(K.ACCESS, accessToken);
    if (refreshToken) sessionStorage.setItem(K.REFRESH, refreshToken);
    sessionStorage.setItem(K.EXP, String(Date.now() + expiresIn * 1000));
  }

  function clear() {
    sessionStorage.removeItem(K.ACCESS);
    sessionStorage.removeItem(K.REFRESH);
    sessionStorage.removeItem(K.EXP);
  }

  function getAccessToken() {
    return sessionStorage.getItem(K.ACCESS);
  }

  function isExpired() {
    const exp = parseInt(sessionStorage.getItem(K.EXP) || '0', 10);
    return !exp || Date.now() >= exp;
  }

  // Converts an already-authenticated demo session into a real, expiring
  // API token. No-op (returns null) if the backend isn't reachable.
  async function requestToken(user) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      store(data.accessToken, data.refreshToken, data.expiresIn);
      return data.accessToken;
    } catch {
      return null;
    }
  }

  async function refresh() {
    const refreshToken = sessionStorage.getItem(K.REFRESH);
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) { clear(); return null; }
      const data = await res.json();
      store(data.accessToken, refreshToken, data.expiresIn);
      return data.accessToken;
    } catch {
      return null;
    }
  }

  // Fetch wrapper for any future protected API route — attaches the
  // bearer token and transparently refreshes it once if expired. If the
  // access token has gone stale from inactivity and there's no valid
  // refresh token either, the request goes out unauthenticated and the
  // API will reject it with 401, same as the reference project's
  // authenticateToken middleware.
  async function authFetch(url, options = {}) {
    if (isExpired()) await refresh();
    const token = getAccessToken();
    const headers = { ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(url, { ...options, headers });
  }

  async function revoke() {
    const refreshToken = sessionStorage.getItem(K.REFRESH);
    clear();
    if (!refreshToken) return;
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Best-effort revoke — the token expires on its own regardless.
    }
  }

  // ── Wrap EC_AUTH so login/signup/logout transparently manage the token ──
  if (typeof EC_AUTH !== 'undefined') {
    const _login  = EC_AUTH.login.bind(EC_AUTH);
    const _signup = EC_AUTH.signup.bind(EC_AUTH);
    const _logout = EC_AUTH.logout.bind(EC_AUTH);

    EC_AUTH.login = function (...args) {
      const session = _login(...args);
      requestToken(session);
      return session;
    };

    EC_AUTH.signup = function (...args) {
      const session = _signup(...args);
      requestToken(session);
      return session;
    };

    EC_AUTH.logout = function (...args) {
      revoke();
      return _logout(...args);
    };
  }

  return { requestToken, refresh, authFetch, getAccessToken, isExpired, clear };
})();
