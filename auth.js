'use strict';
// EquipCore — Authentication Module
// Depends on security.js being loaded first.

const EC_AUTH = (() => {
  // Hardcoded demo users. In production these would be Firebase Auth accounts.
  // SECURITY NOTE: These credentials are visible in client-side source.
  // Migrate to Firebase Authentication before sharing with real clients.
  const USERS = [
    // Super Admin — sees all organisations
    { id: 1,  name: 'Alex Carter',      email: 'admin@equipcore.com',    password: 'admin123',   role: 'admin',  org: 'EquipCore HQ',         orgId: null },
    // Org 1: Vanguard Heavies (Construction)
    { id: 10, name: 'Sipho Ndlovu',     email: 'admin@vanguard.io',     password: 'vanguard1',  role: 'admin',  org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
    { id: 11, name: 'Lerato Molefe',    email: 'user@vanguard.io',      password: 'vanguard1',  role: 'user',   org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
    { id: 12, name: 'Thabo Kgosi',      email: 'driver@vanguard.io',    password: 'vanguard1',  role: 'driver', org: 'Vanguard Heavies Ltd.', orgId: '00000001-0000-0000-0000-000000000001' },
    // Org 2: Oceanic Rigging (Maritime Logistics)
    { id: 20, name: 'Morgan Blake',     email: 'admin@oceanic.com',     password: 'oceanic1',   role: 'admin',  org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
    { id: 21, name: 'Taylor Osei',      email: 'user@oceanic.com',      password: 'oceanic1',   role: 'user',   org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
    { id: 22, name: 'Casey Drummond',   email: 'driver@oceanic.com',    password: 'oceanic1',   role: 'driver', org: 'Oceanic Rigging Corp',  orgId: '00000001-0000-0000-0000-000000000002' },
    // Org 3: Aether Power Grid (Energy)
    { id: 30, name: 'Zanele Mthembu',   email: 'admin@aether.org',      password: 'aether1',    role: 'admin',  org: 'Aether Power Grid',    orgId: '00000001-0000-0000-0000-000000000003' },
    { id: 31, name: 'Pieter van Wyk',   email: 'user@aether.org',       password: 'aether1',    role: 'user',   org: 'Aether Power Grid',    orgId: '00000001-0000-0000-0000-000000000003' },
    { id: 32, name: 'Mandla Zulu',      email: 'driver@aether.org',     password: 'aether1',    role: 'driver', org: 'Aether Power Grid',    orgId: '00000001-0000-0000-0000-000000000003' },
    // Org 4: TerraForming Inc (Agricultural)
    { id: 40, name: 'Fatima Patel',     email: 'admin@terraform.co',    password: 'terraform1', role: 'admin',  org: 'TerraForming Inc',     orgId: '00000001-0000-0000-0000-000000000004' },
    { id: 41, name: 'David Botha',      email: 'user@terraform.co',     password: 'terraform1', role: 'user',   org: 'TerraForming Inc',     orgId: '00000001-0000-0000-0000-000000000004' },
    { id: 42, name: 'Nkosi Dlamini',    email: 'driver@terraform.co',   password: 'terraform1', role: 'driver', org: 'TerraForming Inc',     orgId: '00000001-0000-0000-0000-000000000004' },
    // Org 5: Ironclad Logistics (Logistics)
    { id: 50, name: 'Bongani Dube',     email: 'admin@ironclad.co.za',  password: 'ironclad1',  role: 'admin',  org: 'Ironclad Logistics',   orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
    { id: 51, name: 'Amahle Sithole',   email: 'user@ironclad.co.za',   password: 'ironclad1',  role: 'user',   org: 'Ironclad Logistics',   orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
    { id: 52, name: 'Johan Pretorius',  email: 'driver@ironclad.co.za', password: 'ironclad1',  role: 'driver', org: 'Ironclad Logistics',   orgId: '624ad6b5-3870-43d4-ab35-3d33a1c26d05' },
  ];

  const DASH = {
    admin:  'dashboard-admin.html',
    user:   'dashboard-user.html',
    driver: 'dashboard-driver.html',
    guest:  'dashboard-guest.html',
  };

  const KEY = 'ec_session';
  const REG_KEY = 'ec_registered_users';

  function save(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.touchSession();
  }

  function getRegistered() {
    try { return JSON.parse(localStorage.getItem(REG_KEY)) || []; } catch { return []; }
  }
  function saveRegistered(users) { localStorage.setItem(REG_KEY, JSON.stringify(users)); }
  function allUsers() { return [...USERS, ...getRegistered()]; }

  return {
    signup(name, email, password) {
      const cleanName = String(name || '').trim();
      const cleanEmail = (typeof EC_SECURITY !== 'undefined')
        ? EC_SECURITY.sanitizeInput(email, 'email')
        : String(email || '').toLowerCase().trim();
      const cleanPwd = String(password || '');

      if (!cleanName || !cleanEmail || !cleanPwd) throw new Error('All fields are required.');
      if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.isValidEmail(cleanEmail)) throw new Error('Please enter a valid email address.');
      if (cleanPwd.length < 6) throw new Error('Password must be at least 6 characters.');
      if (allUsers().find(u => u.email === cleanEmail)) throw new Error('An account with this email already exists.');

      const maxId = Math.max(...allUsers().map(u => u.id || 0), 0);
      const newUser = { id: maxId + 1, name: cleanName, email: cleanEmail, password: cleanPwd, role: 'user', org: 'Independent', orgId: null };

      const reg = getRegistered();
      reg.push(newUser);
      saveRegistered(reg);

      if (typeof EC_SECURITY !== 'undefined') EC_SECURITY.audit('SIGNUP_SUCCESS', { userId: newUser.id, email: cleanEmail });

      const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, org: newUser.org, orgId: newUser.orgId };
      save(session);
      return session;
    },

    login(email, password) {
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

      // Sanitise inputs before comparison
      const cleanEmail = (typeof EC_SECURITY !== 'undefined')
        ? EC_SECURITY.sanitizeInput(email, 'email')
        : String(email || '').toLowerCase().trim();
      const cleanPwd = String(password || '');

      const found = allUsers().find(u => u.email === cleanEmail && u.password === cleanPwd);

      if (typeof EC_SECURITY !== 'undefined') {
        const result = EC_SECURITY.recordLoginAttempt(!!found);
        if (!found) {
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
        EC_SECURITY.audit('LOGIN_SUCCESS', { userId: found.id, role: found.role });
      } else if (!found) {
        throw new Error('Invalid email or password.');
      }

      const session = { id: found.id, name: found.name, email: found.email, role: found.role, org: found.org, orgId: found.orgId || null };
      save(session);
      return session;
    },

    logout() {
      const user = this.current();
      if (user && typeof EC_SECURITY !== 'undefined') {
        EC_SECURITY.audit('LOGOUT', { userId: user.id, role: user.role });
      }
      sessionStorage.removeItem(KEY);
      sessionStorage.removeItem('ec_session_ts');
      location.href = 'login.html';
    },

    current() {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      try {
        const user = JSON.parse(raw);
        // Validate session shape and expiry
        if (typeof EC_SECURITY !== 'undefined' && !EC_SECURITY.validateSessionObject(user)) {
          sessionStorage.removeItem(KEY);
          return null;
        }
        return user;
      } catch {
        sessionStorage.removeItem(KEY);
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
        location.href = 'login.html';
        throw new Error('Unauthorised');
      }
      return user;
    },

    dashFor(role) {
      return DASH[role] || 'dashboard-guest.html';
    },

    detectOrg(email) {
      const domain = (email || '').split('@')[1] || '';
      const match  = allUsers().find(u => u.email.split('@')[1] === domain);
      if (match) return { name: match.org, role: match.role };
      return { name: '', role: 'guest' };
    },
  };
})();
