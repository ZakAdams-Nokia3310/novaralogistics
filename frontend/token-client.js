'use strict';
// EquipCore — API Client
//
// Firebase Auth (see auth.js) now issues and refreshes tokens itself, so
// this module's only job is attaching the current user's ID token to any
// call against this project's own backend (functions/, reachable
// same-origin at /api/** via the firebase.json hosting rewrite — no
// hardcoded host, so this works unmodified in every environment).
//
// Load order: security.js, then auth.js, then this file.

const EC_API = (() => {
  const API_BASE = '/api';

  // Firebase Auth's persisted-session restoration on a fresh page load is
  // asynchronous — firebase.auth().currentUser can be null for a brief
  // moment even for an already-signed-in user (e.g. right after
  // login.html navigates to a dashboard page), until the SDK finishes
  // restoring it from storage. onAuthStateChanged fires exactly once with
  // the resolved state (null or a user) as soon as that's determined, so
  // waiting for it here — once per page load, cached — avoids ever
  // sending a request with no Authorization header during that window.
  let _authReady = null;
  function authReady() {
    if (!_authReady) {
      _authReady = new Promise((resolve) => {
        if (typeof firebase === 'undefined' || !firebase.auth) { resolve(null); return; }
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        });
      });
    }
    return _authReady;
  }

  // Attaches "Authorization: Bearer <id token>" to a call against this
  // project's backend. Returns a plain (unauthenticated) fetch if no user
  // is signed in — the backend will reject with 401, same as calling any
  // other protected route without a token.
  async function authFetch(path, options = {}) {
    const headers = { ...(options.headers || {}) };

    await authReady();
    const fbUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    if (fbUser) {
      // getIdToken() returns the cached token and only hits the network to
      // refresh it once Firebase considers it stale — this is what makes
      // an idle-but-still-open tab eventually need a real network round
      // trip instead of coasting on a token that's already expired.
      const token = await fbUser.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_BASE}${path}`, { ...options, headers });
  }

  async function whoAmI() {
    const res = await authFetch('/auth/me');
    if (!res.ok) return null;
    return (await res.json()).user;
  }

  return { authFetch, whoAmI };
})();
