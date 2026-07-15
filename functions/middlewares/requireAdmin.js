'use strict';
// Gate for endpoints that must only be callable by an existing admin — must
// run after authenticateToken so req.user is populated from a verified token.

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin role required' });
  }
  next();
}

module.exports = requireAdmin;
