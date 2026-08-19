'use strict';
// Gate for endpoints that must only be callable by an existing admin — must
// run after authenticateToken so req.user is populated from a verified token.
// Thin wrapper around requireRole so both stay in sync; kept as its own file
// since every current call site imports `requireAdmin` by name.

const requireRole = require('./requireRole');

// super_admin is a strict superset of admin (see registry/dataOperations.js's
// ADMIN constant doc comment) — every admin-only endpoint stays reachable to
// it too. The handful of super-admin-exclusive operations are gated
// separately, at the Data Connect registry level, not here.
module.exports = requireRole('admin', 'super_admin');
