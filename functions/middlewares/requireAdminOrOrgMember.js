'use strict';
// Gate for endpoints that must be reachable by an admin OR any signed-in
// user who belongs to an organisation (TOTP is required for both — see
// controllers/totpController.js) — must run after authenticateToken so
// req.user is populated from a verified token. req.user.orgId comes
// straight from the custom claims (authenticateToken.js), no extra DB
// round-trip needed here.

const { logEvent } = require('../services/auditLog');

module.exports = function requireAdminOrOrgMember(req, res, next) {
  const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'super_admin');
  if (!req.user || (!isAdmin && !req.user.orgId)) {
    logEvent(req, 'ACCESS_DENIED_ROLE', { required: 'admin-or-org-member' });
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
