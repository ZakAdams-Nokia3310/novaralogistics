'use strict';
// Structured security/audit logging — writes to two places:
//   1. Cloud Functions logs (console) — structured JSON, one line per
//      event, searchable/alertable in Cloud Logging.
//   2. The AuditLog Data Connect table — durable, queryable from the admin
//      audit page, survives log retention windows.
// Never throws: a logging failure must never break the request it's
// logging (e.g. block a legitimate login because the audit write failed).

const { runMutation } = require('./dataConnect');

function clientIp(req) {
  // req.ip reflects X-Forwarded-For once index.js sets `trust proxy`
  // (Cloud Functions always sits behind Firebase Hosting's proxy).
  return req.ip || (req.headers && req.headers['x-forwarded-for']) || 'unknown';
}

async function logEvent(req, action, details = {}) {
  // Wraps the entire body, not just the database write below — a logging
  // call must never be the reason a request fails (e.g. a caller awaiting
  // logEvent() outside its own try/catch, trusting this doc comment).
  try {
    const user = req.user || null;
    const entry = {
      ts: new Date().toISOString(),
      action,
      userId: user ? user.id : null,
      userRole: user ? user.role : 'anonymous',
      userEmail: user ? user.email : null,
      ip: clientIp(req),
      route: req.originalUrl || req.url,
      details,
    };

    console.log('[audit]', JSON.stringify(entry));

    try {
      await runMutation('CreateAuditLog', {
        userId: null, // AuditLog.userId is a Data Connect UUID FK to users.id, not the Firebase uid we have here — left null to avoid a bad FK; userName/userRole/details carry the identity instead.
        userName: user ? (user.name || user.email) : 'anonymous',
        userRole: user ? user.role : 'anonymous',
        action,
        details: JSON.stringify(details).slice(0, 4000),
        page: req.originalUrl || req.url,
        ipAddress: String(clientIp(req)).slice(0, 45),
        userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
      });
    } catch (err) {
      console.error('[audit] failed to persist audit log entry:', err.message);
    }
  } catch (err) {
    console.error('[audit] logEvent itself failed:', err.message);
  }
}

module.exports = { logEvent };
