'use strict';
// EquipCore — Authentication Module
// Depends on security.js, and on the Firebase compat SDK + firebase-config.js
// being loaded first (see the <script> order at the top of every page).

const EC_AUTH = (() => {
  if (typeof firebase !== 'undefined' && typeof FIREBASE_CONFIG !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  // Extensionless — matches the clean URLs served by firebase.json's
  // "cleanUrls" setting (and server.js's local-dev equivalent).
  const DASH = {
    admin:  'dashboard-admin',
    user:   'dashboard-user',
    driver: 'dashboard-driver',
    guest:  'dashboard-guest',
  };

  const KEY = 'ec_session';
  // Holds a computed-but-not-yet-active session while an admin account
  // completes the TOTP gate (see checkTotpRequired below) — deliberately a
  // different key from KEY, so EC_AUTH.current() keeps returning null
  // (i.e. "not logged in") until 2FA actually passes, not just until
  // Firebase Auth itself succeeds.
  const PENDING_KEY = 'ec_session_pending';

  function save(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.touchSession();
  }

  function clear() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem('ec_session_ts');
  }

  // Two-factor auth is required for admin accounts (occasional beyond
  // initial enrollment — see functions/controllers/totpController.js's
  // REVERIFY_WINDOW_MS). Checked server-side, never assumed client-side:
  // this only decides whether to route through verify-2fa.html before the
  // session becomes active, the actual enrollment/challenge verification
  // happens entirely on the server.
  async function checkTotpRequired(session) {
    if (session.role !== 'admin' || typeof EC_API === 'undefined') return false;
    try {
      const res = await EC_API.authFetch('/auth/totp/status');
      if (!res.ok) return false;
      const body = await res.json();
      return !!(body.needsEnrollment || body.needsChallenge);
    } catch {
      return false;
    }
  }

  // Builds the session object the rest of this app already expects
  // (guardPage, sidebar, dashboards) from a signed-in Firebase user —
  // verified against the real database, not the Firebase ID token's custom
  // claims alone. Firebase Auth only proves *who* signed in; it doesn't
  // prove a corresponding app record exists. Custom claims can also drift
  // from the database — functions/controllers/authController.js's setRole
  // only calls admin.auth().setCustomUserClaims, it never touches the
  // Postgres User row's role/organisationId — so the database, not the
  // token, is treated as the authority for role/org here. A signed-in
  // Firebase user with no matching database row (or a row that no longer
  // resolves to a real organisation) is rejected outright: throws, and the
  // caller (login/signup/onIdTokenChanged below) is responsible for signing
  // the now-unusable Firebase session back out.
  async function sessionFromFirebaseUser(fbUser) {
    let dbUser;
    try {
      dbUser = await DC_DATA.getUserByEmailLive(fbUser.email);
    } catch (err) {
      throw new Error('Unable to verify your account right now. Please try again.');
    }
    if (!dbUser) {
      throw new Error('No account found for this login. Contact an administrator.');
    }
    if (dbUser.status && dbUser.status !== 'ACTIVE') {
      throw new Error('This account has been deactivated. Contact an administrator.');
    }
    // dbUser.organisation resolves via the User row's organisationId FK —
    // Data Connect only returns a non-null relation when the referenced
    // Organisation row actually exists, so a present orgId with a null
    // organisation here would mean a dangling reference in the database
    // itself, not just a missing claim.
    if (dbUser.organisation === undefined) {
      throw new Error('Unable to verify your organisation right now. Please try again.');
    }

    // Firebase custom claims and the database are two separate systems —
    // pre-existing/seeded accounts can have a database role with no
    // matching claim ever set (the claim only gets written when an admin
    // explicitly changes someone's role via /auth/set-role). Server-side
    // authorization for actual data requests (registry/dataOperations.js)
    // depends on the claim, not the database, so a drifted account could
    // otherwise log in fine here and then get rejected by every dashboard
    // data call. Self-heals on every login/token-refresh; forces an
    // immediate token refresh when a fix was actually needed so the
    // CURRENT session carries the corrected claim right away instead of
    // waiting up to an hour for Firebase's own refresh cycle.
    if (typeof EC_API !== 'undefined') {
      try {
        const syncRes = await EC_API.authFetch('/auth/sync-claims', { method: 'POST' });
        if (syncRes.ok) {
          const syncBody = await syncRes.json();
          if (syncBody.synced) await fbUser.getIdToken(true);
        }
      } catch { /* best effort — a sync failure here shouldn't block login */ }
    }

    return {
      id    : fbUser.uid,
      // The Data Connect User row's own id — a different id space from
      // Firebase's `id` above. Needed anywhere a real database UUID
      // reference is submitted (e.g. CreateRentalApplication's
      // applicantUserId) — sending the Firebase uid there fails uuid
      // validation server-side.
      dbId  : dbUser.id,
      name  : dbUser.name || fbUser.displayName || (fbUser.email || '').split('@')[0],
      email : fbUser.email,
      role  : (dbUser.role || 'USER').toLowerCase(),
      org   : dbUser.organisation ? dbUser.organisation.name : 'Independent',
      orgId : dbUser.organisation ? dbUser.organisation.id : null,
    };
  }

  // Set for the duration of signup() below — createUserWithEmailAndPassword
  // fires this same onIdTokenChanged listener before signup() has had a
  // chance to create the new account's database row, which would otherwise
  // make the "no DB row" branch below sign the brand-new user right back
  // out from under signup() (and, now that the row-creation call itself
  // requires an active session, break signup entirely). While this is set,
  // a missing DB row is expected and not treated as a reason to sign out.
  let _signupInProgress = false;

  // Keeps sessionStorage in sync with Firebase's real auth state across
  // page loads and token refreshes — e.g. picks up a role change (custom
  // claims) or a sign-out triggered elsewhere without a manual page action.
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      if (!fbUser) { clear(); return; }
      if (_signupInProgress) return;
      try {
        save(await sessionFromFirebaseUser(fbUser));
      } catch {
        // Firebase still considers this session valid but the database
        // check failed (row deleted/deactivated since last check, etc.) —
        // sign out of Firebase too, not just clear the local mirror, so
        // this doesn't just re-fail silently on every future token refresh.
        clear();
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
      }
    });
  }

  return {
    async signup(name, email, password) {
      const cleanName = String(name || '').trim();
      const cleanEmail = (typeof EC_SECURITY !== 'undefined')
        ? EC_SECURITY.sanitizeInput(email, 'email')
        : String(email || '').toLowerCase().trim();
      const cleanPwd = String(password || '');

      if (!cleanName || !cleanEmail || !cleanPwd) throw new Error('All fields are required.');
      if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.isValidEmail(cleanEmail)) throw new Error('Please enter a valid email address.');
      if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.isStrongPassword(cleanPwd)) throw new Error('Password must be at least 8 characters and include a letter and a number.');

      let cred;
      _signupInProgress = true;
      try {
        try {
          cred = await firebase.auth().createUserWithEmailAndPassword(cleanEmail, cleanPwd);
        } catch (err) {
          if (err.code === 'auth/email-already-in-use') throw new Error('An account with this email already exists.');
          if (err.code === 'auth/weak-password') throw new Error('Password must be at least 8 characters and include a letter and a number.');
          throw new Error('Could not create account. Please try again.');
        }

        await cred.user.updateProfile({ displayName: cleanName });
        try { await cred.user.sendEmailVerification(); } catch { /* best effort — login() re-sends on the gated attempt */ }

        // Firebase Auth account creation alone never touches the database —
        // create the corresponding Postgres User row now (role USER, no org;
        // an admin assigns both afterward, same as functions/controllers/
        // authController.js's setRole already requires for any role change),
        // so sessionFromFirebaseUser's database check below finds a real row
        // instead of rejecting the account it just created.
        if (typeof DC_DATA === 'undefined') {
          try { await cred.user.delete(); } catch { /* best effort */ }
          throw new Error('Could not finish creating your account. Please try again.');
        }
        try {
          await DC_DATA.createUserLive(cleanName, cleanEmail);
        } catch (err) {
          try { await cred.user.delete(); } catch { /* best effort */ }
          throw new Error('Could not finish creating your account. Please try again.');
        }

        if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('SIGNUP_SUCCESS', { userId: cred.user.uid, email: cleanEmail });
        if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'SIGNUP_SUCCESS' }) }).catch(() => {});

        // Don't hand back an active session yet — login() enforces the same
        // verified-email gate, so signing in here would just get bounced
        // right back out. Sign out (still inside the _signupInProgress
        // guard, so onIdTokenChanged doesn't race a session into
        // sessionStorage in the gap) and tell the caller to show a
        // check-your-email step instead of redirecting to the dashboard.
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
      } finally {
        _signupInProgress = false;
      }

      return { _verificationPending: true, email: cleanEmail };
    },

    async login(email, password) {
      // Rate-limit login calls
      if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.checkRateLimit('login')) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      // Check lockout before any credential test (avoids timing oracle)
      if (typeof EC_SECURITY !== 'undefined' && EC_SECURITY.isLockedOut()) {
        const ms   = EC_SECURITY.lockoutRemainingMs();
        const mins = Math.ceil(ms / 60000);
        throw new Error(`Account temporarily locked. Try again in ${mins} minute${mins !== 1 ? 's' : ''}.`);
      }

      const cleanEmail = (typeof EC_SECURITY !== 'undefined')
        ? EC_SECURITY.sanitizeInput(email, 'email')
        : String(email || '').toLowerCase().trim();
      const cleanPwd = String(password || '');

      let cred = null;
      try {
        cred = await firebase.auth().signInWithEmailAndPassword(cleanEmail, cleanPwd);
      } catch {
        // Fall through with cred === null — handled below the same way as
        // the old "found" check, so lockout/audit logic is identical.
      }

      if (typeof EC_SECURITY !== 'undefined') {
        const result = EC_SECURITY.recordLoginAttempt(!!cred);
        if (!cred) {
          if (result.lockedUntil) {
            EC_SECURITY.audit('LOGIN_FAILED_LOCKED', { email: cleanEmail });
            if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-failed-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: cleanEmail }) }).catch(() => {});
            const mins = Math.ceil(EC_SECURITY.lockoutRemainingMs() / 60000);
            throw new Error(`Too many failed attempts. Account locked for ${mins} minute${mins !== 1 ? 's' : ''}.`);
          }
          EC_SECURITY.audit('LOGIN_FAILED', { email: cleanEmail, attemptsLeft: result.attemptsLeft });
          if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-failed-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: cleanEmail }) }).catch(() => {});
          const warn = result.attemptsLeft <= 2
            ? ` (${result.attemptsLeft} attempt${result.attemptsLeft !== 1 ? 's' : ''} remaining)`
            : '';
          throw new Error('Invalid email or password.' + warn);
        }
      } else if (!cred) {
        throw new Error('Invalid email or password.');
      }

      // Password accounts must verify their email before the session is
      // considered usable — Google sign-in accounts skip this (Google
      // already verified the address as part of its own OAuth flow, see
      // checkGoogleRedirectResult below). Re-sends the link on every blocked attempt
      // (best effort) so a user who lost the original isn't stuck.
      const isPasswordAccount = (cred.user.providerData || []).some(p => p.providerId === 'password');
      if (isPasswordAccount && !cred.user.emailVerified) {
        try { await cred.user.sendEmailVerification(); } catch { /* best effort */ }
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
        if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_FAILED_UNVERIFIED_EMAIL', { email: cleanEmail });
        throw new Error('Please verify your email before signing in. We just sent a new verification link to ' + cleanEmail + '.');
      }

      let session;
      try {
        session = await sessionFromFirebaseUser(cred.user);
      } catch (err) {
        // Correct password, but no matching database record (or a
        // deactivated one, or an org-lookup failure) — Firebase itself must
        // not be left signed in to an account the app is refusing. The
        // specific reason (see sessionFromFirebaseUser above) is kept out
        // of what's shown here deliberately: surfacing "no account" vs
        // "deactivated" vs "wrong password" as different messages would let
        // someone who already has a valid password for an email fingerprint
        // that account's state. One generic message regardless of cause.
        if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_FAILED_NO_DB_RECORD', { email: cleanEmail, reason: err.message });
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
        throw new Error('Invalid email or password.');
      }
      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_SUCCESS', { userId: session.id, role: session.role });
      if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'LOGIN_SUCCESS' }) }).catch(() => {});

      if (await checkTotpRequired(session)) {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(session));
        return { ...session, _totpPending: true };
      }
      save(session);
      return session;
    },

    // Single entry point for both "sign in" and "sign up" with Google —
    // an existing account (matched by email, same bridge every other flow
    // here uses) logs straight in; a first-time Google sign-in is
    // auto-registered exactly like a self-signup (role USER, no
    // organisation, nothing client-supplied trusted for either) since
    // there's no separate password step to gate account creation behind.
    // Full-page redirect, not a popup — signInWithPopup's result relies on
    // the popup window and the opener communicating through storage on the
    // *.firebaseapp.com auth domain, which is a different origin from this
    // site. Browsers that partition storage by top-level site (Chrome's
    // storage-partitioning rollout, Safari ITP, etc.) can break that
    // handshake entirely, landing on firebaseapp.com/__/auth/handler with
    // "The requested action is invalid" instead of ever returning a result.
    // A redirect has no such handshake: the whole page navigates to Google
    // and back, so the result is picked up same-origin via
    // getRedirectResult() on the next load (see checkGoogleRedirectResult).
    // This method itself only ever navigates away — it has no meaningful
    // return value, since execution doesn't resume here.
    async beginGoogleLogin() {
      if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.checkRateLimit('login')) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      if (typeof firebase === 'undefined' || !firebase.auth) {
        throw new Error('Google sign-in is unavailable right now. Please try again.');
      }
      // Read synchronously, before Firebase even loads, by login.html/
      // signup.html's inline head script — lets the page show a loading
      // state immediately on the return trip instead of flashing the bare
      // form while checkGoogleRedirectResult() is still resolving.
      sessionStorage.setItem('ec_google_redirect_pending', '1');
      await firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },

    // Call once on page load (login.html / signup.html) to pick up the
    // result of beginGoogleLogin's redirect. Resolves to null on an
    // ordinary page load that isn't returning from Google at all.
    async checkGoogleRedirectResult() {
      if (typeof firebase === 'undefined' || !firebase.auth) return null;

      let cred;
      try {
        cred = await firebase.auth().getRedirectResult();
        if (!cred || !cred.user) return null;
      } catch (err) {
        if (err.code === 'auth/account-exists-with-different-credential') {
          throw new Error('An account with this email already exists using a password. Sign in with your password instead.');
        }
        if (!err.code) return null; // not actually a redirect-result error — ordinary load
        throw new Error('Google sign-in failed. Please try again.');
      }

      // Same race as email/password signup (see the guard's comment near
      // the top of this file) — Firebase fires onIdTokenChanged before this
      // function gets a chance to create a first-time account's database row.
      _signupInProgress = true;
      let isNewDbUser = false;
      try {
        let dbUser = await DC_DATA.getUserByEmailLive(cred.user.email);
        if (!dbUser) {
          if (typeof DC_DATA === 'undefined') {
            try { await cred.user.delete(); } catch { /* best effort */ }
            throw new Error('Could not finish creating your account. Please try again.');
          }
          const name = cred.user.displayName || cred.user.email.split('@')[0];
          try {
            await DC_DATA.createUserLive(name, cred.user.email);
          } catch {
            try { await cred.user.delete(); } catch { /* best effort */ }
            throw new Error('Could not finish creating your account. Please try again.');
          }
          isNewDbUser = true;
        }
      } finally {
        _signupInProgress = false;
      }

      let session;
      try {
        session = await sessionFromFirebaseUser(cred.user);
      } catch (err) {
        // Same reasoning as login()'s identical catch above — one generic
        // message regardless of cause, and Firebase must not be left
        // signed in to an account the app is refusing.
        if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_FAILED_NO_DB_RECORD', { email: cred.user.email, provider: 'google', reason: err.message });
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
        throw new Error('Google sign-in failed. Please try again.');
      }
      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit(isNewDbUser ? 'SIGNUP_SUCCESS' : 'LOGIN_SUCCESS', { userId: session.id, role: session.role, provider: 'google' });
      if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: isNewDbUser ? 'SIGNUP_SUCCESS' : 'LOGIN_SUCCESS' }) }).catch(() => {});

      if (await checkTotpRequired(session)) {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(session));
        return { ...session, _totpPending: true };
      }
      save(session);
      return session;
    },

    async logout() {
      const user = this.current();
      if (user && typeof EC_SECURITY !== 'undefined') {
        EC_SECURITY.audit('LOGOUT', { userId: user.id, role: user.role });
      }
      // Must happen BEFORE signOut() below — this call needs a still-valid
      // token to authenticate itself with, same as every other /api/data
      // and /api/auth call in this app.
      if (user && typeof EC_API !== 'undefined') {
        try { await EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'LOGOUT' }) }); } catch { /* best effort */ }
      }
      clear();
      if (typeof firebase !== 'undefined' && firebase.auth) {
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
      }
      location.href = 'login';
    },

    // Called by verify-2fa.html once the TOTP challenge/enrollment has
    // actually succeeded (verified server-side) — promotes the session
    // computed at login time from "pending" to active. Returns null if
    // there's no pending session (e.g. the page was reached directly
    // without going through login/checkGoogleRedirectResult first).
    finalizePendingSession() {
      const raw = sessionStorage.getItem(PENDING_KEY);
      sessionStorage.removeItem(PENDING_KEY);
      if (!raw) return null;
      try {
        const session = JSON.parse(raw);
        save(session);
        return session;
      } catch {
        return null;
      }
    },

    current() {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      try {
        const user = JSON.parse(raw);
        if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.validateSessionObject(user)) {
          clear();
          return null;
        }
        return user;
      } catch {
        clear();
        return null;
      }
    },

    require(roles) {
      const user = this.current();
      if (!user || !roles.includes(user.role)) {
        if (typeof EC_SECURITY !== 'undefined') {
          EC_SECURITY.audit('UNAUTHORIZED_ACCESS_ATTEMPT', {
            page     : location.pathname.split('/').pop(),
            userRole : user?.role || 'none',
            required : roles,
          });
        }
        location.href = 'login';
        throw new Error('Unauthorised');
      }
      return user;
    },

    dashFor(role) {
      return DASH[role] || 'dashboard-guest';
    },
  };
})();
