'use strict';
// Verifies a Firebase Auth ID token (not a self-issued JWT — Firebase issues
// and expires these itself, ~1hr lifetime, and the client SDK only refreshes
// one while the app is actually open and signed in). Same Bearer-token shape
// as the reference project's authenticateToken.js.

const admin = require('firebase-admin');

async function authenticateToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
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
    res.status(401).json({ error: message });
  }
}

module.exports = authenticateToken;
