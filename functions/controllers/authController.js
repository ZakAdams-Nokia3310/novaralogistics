'use strict';

const admin = require('firebase-admin');

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
  res.status(200).json({ user: req.user });
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
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Failed to set role' });
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
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Failed to set password' });
  }
};
