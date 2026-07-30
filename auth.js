'use strict';
// EquipCore — Authentication Module
// Depends on security.js, and on the Firebase compat SDK + firebase-config.js
// being loaded first (see the <script> order at the top of every page).

const EC_AUTH = (() => {
  if (typeof firebase !== 'undefined' && typeof FIREBASE_CONFIG !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  // Client-side hint only, used to preview which org an email domain
  // belongs to before sign-in even completes. Real role/org assignment
  // happens server-side via custom claims (see
  // functions/controllers/authController.js's setRole) — this map cannot
  // grant access to anything by itself, it only colors a UI pill.
  const ORG_DOMAINS = {
    'vanguard.io'    : 'Vanguard Heavies Ltd.',
    'oceanic.com'    : 'Oceanic Rigging Corp',
    'aether.org'     : 'Aether Power Grid',
    'terraform.co'   : 'TerraForming Inc',
    'ironclad.co.za' : 'Ironclad Logistics',
    'equipcore.com'  : 'EquipCore HQ',
  };

  // Extensionless — matches the clean URLs served by firebase.json's
  // "cleanUrls" setting (and server.js's local-dev equivalent).
  const DASH = {
    admin:  'dashboard-admin',
    user:   'dashboard-user',
    driver: 'dashboard-driver',
    guest:  'dashboard-guest',
  };

  const KEY = 'ec_session';

  function save(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.touchSession();
  }

  function clear() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem('ec_session_ts');
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
      if (cleanPwd.length < 6) throw new Error('Password must be at least 6 characters.');

      let cred;
      _signupInProgress = true;
      try {
        try {
          cred = await firebase.auth().createUserWithEmailAndPassword(cleanEmail, cleanPwd);
        } catch (err) {
          if (err.code === 'auth/email-already-in-use') throw new Error('An account with this email already exists.');
          if (err.code === 'auth/weak-password') throw new Error('Password must be at least 6 characters.');
          throw new Error('Could not create account. Please try again.');
        }

        await cred.user.updateProfile({ displayName: cleanName });

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
      } finally {
        _signupInProgress = false;
      }

      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('SIGNUP_SUCCESS', { userId: cred.user.uid, email: cleanEmail });
      if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'SIGNUP_SUCCESS' }) }).catch(() => {});

      const session = await sessionFromFirebaseUser(cred.user);
      save(session);
      return session;
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

      let session;
      try {
        session = await sessionFromFirebaseUser(cred.user);
      } catch (err) {
        // Correct password, but no matching database record (or a
        // deactivated one) — Firebase itself must not be left signed in to
        // an account the app is refusing.
        if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_FAILED_NO_DB_RECORD', { email: cleanEmail });
        try { await firebase.auth().signOut(); } catch { /* already signed out */ }
        throw err;
      }
      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_SUCCESS', { userId: session.id, role: session.role });
      if (typeof EC_API !== 'undefined') EC_API.authFetch('/auth/log-session-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'LOGIN_SUCCESS' }) }).catch(() => {});
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

    // Client-side hint only — see ORG_DOMAINS above.
    detectOrg(email) {
      const domain = (email || '').split('@')[1]?.toLowerCase() || '';
      const org = ORG_DOMAINS[domain];
      return org ? { name: org, role: 'user' } : { name: '', role: 'guest' };
    },
  };
})();
