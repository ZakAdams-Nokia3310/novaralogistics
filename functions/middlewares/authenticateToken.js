'use strict';
// Verifies a Firebase Auth ID token (not a self-issued JWT — Firebase issues
// and expires these itself, ~1hr lifetime, and the client SDK only refreshes
// one while the app is actually open and signed in). Same Bearer-token shape
// as the reference project's authenticateToken.js.

const admin = require('firebase-admin');
const { logEvent } = require('../services/auditLog');

async function authenticateToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    logEvent(req, 'ACCESS_DENIED_NO_TOKEN', {});
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }

  const token = header.slice('Bearer '.length);
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      id    : decoded.uid,
      email : decoded.email || null,
      name  : decoded.name || null,
      // Role/org are custom claims set server-side (see controllers/authController.js
      // setRole) — never trust a value the client could have supplied itself.
      role  : decoded.role || 'user',
      org   : decoded.org || null,
      orgId : decoded.orgId || null,
    };
    next();
  } catch (err) {
    const message = err.code === 'auth/id-token-expired' ? 'Token expired' : 'Not authorized, invalid token';
    logEvent(req, 'ACCESS_DENIED_BAD_TOKEN', { reason: err.code || 'unknown' });
    res.status(401).json({ error: message });
  }
}

module.exports = authenticateToken;
