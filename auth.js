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
  // (guardPage, sidebar, dashboards) from a signed-in Firebase user and
  // their custom claims.
  async function sessionFromFirebaseUser(fbUser) {
    const idTokenResult = await fbUser.getIdTokenResult();
    const claims = idTokenResult.claims || {};
    return {
      id    : fbUser.uid,
      name  : fbUser.displayName || claims.name || (fbUser.email || '').split('@')[0],
      email : fbUser.email,
      role  : claims.role || 'user',
      org   : claims.org || (claims.role ? '' : 'Independent'),
      orgId : claims.orgId || null,
    };
  }

  // Keeps sessionStorage in sync with Firebase's real auth state across
  // page loads and token refreshes — e.g. picks up a role change (custom
  // claims) or a sign-out triggered elsewhere without a manual page action.
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onIdTokenChanged(async (fbUser) => {
      if (!fbUser) { clear(); return; }
      try {
        save(await sessionFromFirebaseUser(fbUser));
      } catch {
        clear();
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
      try {
        cred = await firebase.auth().createUserWithEmailAndPassword(cleanEmail, cleanPwd);
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') throw new Error('An account with this email already exists.');
        if (err.code === 'auth/weak-password') throw new Error('Password must be at least 6 characters.');
        throw new Error('Could not create account. Please try again.');
      }

      await cred.user.updateProfile({ displayName: cleanName });

      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('SIGNUP_SUCCESS', { userId: cred.user.uid, email: cleanEmail });

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
            const mins = Math.ceil(EC_SECURITY.lockoutRemainingMs() / 60000);
            throw new Error(`Too many failed attempts. Account locked for ${mins} minute${mins !== 1 ? 's' : ''}.`);
          }
          EC_SECURITY.audit('LOGIN_FAILED', { email: cleanEmail, attemptsLeft: result.attemptsLeft });
          const warn = result.attemptsLeft <= 2
            ? ` (${result.attemptsLeft} attempt${result.attemptsLeft !== 1 ? 's' : ''} remaining)`
            : '';
          throw new Error('Invalid email or password.' + warn);
        }
      } else if (!cred) {
        throw new Error('Invalid email or password.');
      }

      const session = await sessionFromFirebaseUser(cred.user);
      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('LOGIN_SUCCESS', { userId: session.id, role: session.role });
      save(session);
      return session;
    },

    async logout() {
      const user = this.current();
      if (user && typeof EC_SECURITY !== 'undefined') {
        EC_SECURITY.audit('LOGOUT', { userId: user.id, role: user.role });
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
