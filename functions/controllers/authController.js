'use strict';

const admin = require('firebase-admin');
const { logEvent } = require('../services/auditLog');
const { runQuery } = require('../services/dataConnect');

// RegEx whitelist for the fields accepted here — same defence-in-depth
// style used elsewhere in this project (see security.js's isValid* functions).
const UID_RE   = /^[a-zA-Z0-9]{1,128}$/;
const ROLE_RE  = /^(admin|user|driver|guest)$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Data Connect (Postgres) doesn't know a user's Firebase UID — the app
// bridges the two systems by email (see profile.html, which already looks
// up a Data Connect row by email for the same reason). Accept either a uid
// or an email here so callers on either side of that bridge can use it.
async function resolveTargetUid(body) {
  if (body.uid) {
    if (!UID_RE.test(String(body.uid))) throw Object.assign(new Error('Invalid uid'), { status: 400 });
    return body.uid;
  }
  if (body.email) {
    if (!EMAIL_RE.test(String(body.email))) throw Object.assign(new Error('Invalid email'), { status: 400 });
    const user = await admin.auth().getUserByEmail(body.email);
    return user.uid;
  }
  throw Object.assign(new Error('uid or email is required'), { status: 400 });
}

exports.whoAmI = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// Called by auth.js right after a successful login/signup, and on logout —
// these have a valid token to authenticate the log call itself with. A
// small fixed whitelist (not an arbitrary client-supplied action string)
// so this can't be used to write fake entries under a made-up action name.
const SESSION_EVENTS = new Set(['LOGIN_SUCCESS', 'SIGNUP_SUCCESS', 'LOGOUT']);
exports.logSessionEvent = async (req, res) => {
  const event = (req.body && req.body.event) || '';
  if (!SESSION_EVENTS.has(event)) {
    return res.status(400).json({ error: 'Invalid event' });
  }
  await logEvent(req, event, {});
  res.status(200).json({ success: true });
};

// Self-service claims resync — brings the CALLER's OWN custom claims in
// line with their OWN database row. Safe to expose to any signed-in user
// with no role check: it can only ever mirror a role/org the database
// already says this exact account has (bridged by their own verified
// email, never a client-supplied target), so it can't grant anything —
// only correct drift. Needed because custom claims and the database are
// two separate systems (see auth.js's sessionFromFirebaseUser comment):
// pre-existing/seeded accounts may have a database role with no matching
// claim ever set, which server-side authorization (registry/dataOperations.js)
// depends on — without this, such an account can log in (the database
// still grants the right client-side session) but then get rejected by
// every actual data request.
exports.syncOwnClaims = async (req, res) => {
  try {
    const data = await runQuery('GetUserByEmail', { email: req.user.email });
    const dbUser = data.users && data.users[0];
    if (!dbUser) {
      return res.status(200).json({ synced: false, reason: 'no-db-row' });
    }

    const claimRole = dbUser.role ? dbUser.role.toLowerCase() : 'user';
    const claimOrg = dbUser.organisation ? dbUser.organisation.name : null;
    const claimOrgId = dbUser.organisation ? dbUser.organisation.id : null;

    // Data Connect returns UUIDs without hyphens; existing custom claims
    // (set via /auth/set-role) store them hyphenated — same value, two
    // string forms. Compare on the normalized form so this doesn't treat
    // every org-affiliated login as "out of sync" and resync it needlessly.
    const norm = (v) => (v == null ? v : String(v).replace(/-/g, ''));
    const alreadyInSync = req.user.role === claimRole
      && req.user.org === claimOrg
      && norm(req.user.orgId) === norm(claimOrgId);
    if (alreadyInSync) {
      return res.status(200).json({ synced: false, reason: 'already-in-sync' });
    }

    await admin.auth().setCustomUserClaims(req.user.id, { role: claimRole, org: claimOrg, orgId: claimOrgId });
    await logEvent(req, 'CLAIMS_SYNCED', { from: req.user.role, to: claimRole });
    res.status(200).json({ synced: true, role: claimRole });
  } catch (err) {
    console.error('syncOwnClaims:', err.message);
    res.status(500).json({ error: 'Unable to sync claims' });
  }
};

// Called by auth.js right after Firebase Auth rejects a sign-in attempt —
// deliberately unauthenticated (a failed login has no token to send), so
// this is rate-limited hard at the route level and only ever writes a log
// entry, never touches account state.
exports.logFailedLogin = async (req, res) => {
  const email = String((req.body && req.body.email) || '').trim().slice(0, 200);
  await logEvent(req, 'LOGIN_FAILED', { email });
  res.status(200).json({ success: true });
};

// Admin-only: assigns role/org custom claims to another account. Custom
// claims can only be set with the Admin SDK, so this is the only way a
// user's role can change — a client can never grant itself a role.
exports.setRole = async (req, res) => {
  try {
    const uid = await resolveTargetUid(req.body || {});
    const { role, org, orgId } = req.body || {};

    if (!ROLE_RE.test(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    await admin.auth().setCustomUserClaims(uid, {
      role,
      org: org || null,
      orgId: orgId || null,
    });
    await logEvent(req, 'ROLE_CHANGED', { targetUid: uid, newRole: role });
    res.status(200).json({ success: true, message: 'Role updated' });
  } catch (err) {
    console.error('setRole:', err.message);
    await logEvent(req, 'ROLE_CHANGE_FAILED', { reason: err.message });
    const status = err.status || 500;
    res.status(status).json({ error: status < 500 ? err.message : 'Failed to set role' });
  }
};

// Admin-only: resets another user's password. A client-side Firebase SDK
// can only ever change the CURRENTLY signed-in user's own password
// (updatePassword) — changing someone else's requires the Admin SDK, which
// is why this couldn't be done from the browser at all before this endpoint
// existed (the old demo version faked it by editing a local array).
exports.setPassword = async (req, res) => {
  try {
    const uid = await resolveTargetUid(req.body || {});
    const { newPassword } = req.body || {};

    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    await admin.auth().updateUser(uid, { password: newPassword });
    await logEvent(req, 'PASSWORD_CHANGED', { targetUid: uid });
    res.status(200).json({ success: true, message: 'Password updated' });
  } catch (err) {
    console.error('setPassword:', err.message);
    await logEvent(req, 'PASSWORD_CHANGE_FAILED', { reason: err.message });
    const status = err.status || 500;
    res.status(status).json({ error: status < 500 ? err.message : 'Failed to set password' });
  }
};
