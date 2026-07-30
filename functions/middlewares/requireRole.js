'use strict';
// Generic role gate — must run after authenticateToken so req.user is
// populated from a verified token. requireAdmin.js is a thin wrapper around
// this for the admin-only case; use this directly wherever an endpoint
// should allow more than one role (e.g. requireRole('admin', 'driver')).

const { logEvent } = require('../services/auditLog');

function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logEvent(req, 'ACCESS_DENIED_ROLE', { required: allowedRoles }); // fire-and-forget — logEvent never throws, see services/auditLog.js
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

module.exports = requireRole;
