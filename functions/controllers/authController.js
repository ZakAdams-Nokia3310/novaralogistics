'use strict';

const admin = require('firebase-admin');

// RegEx whitelist for the fields accepted here — same defence-in-depth
// style used elsewhere in this project (see security.js's isValid* functions).
const UID_RE  = /^[a-zA-Z0-9]{1,128}$/;
const ROLE_RE = /^(admin|user|driver|guest)$/;

exports.whoAmI = (req, res) => {
  res.status(200).json({ user: req.user });
};

// Admin-only: assigns role/org custom claims to another account. Custom
// claims can only be set with the Admin SDK, so this is the only way a
// user's role can change — a client can never grant itself a role.
exports.setRole = async (req, res) => {
  const { uid, role, org, orgId } = req.body || {};

  if (!UID_RE.test(String(uid || ''))) {
    return res.status(400).json({ error: 'Invalid uid' });
  }
  if (!ROLE_RE.test(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, {
      role,
      org: org || null,
      orgId: orgId || null,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to set role' });
  }
};
