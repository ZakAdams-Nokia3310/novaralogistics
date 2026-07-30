'use strict';
// In-memory IP rate limiters — same approach as the static server's limiter
// in server.js, kept dependency-free. Note: Cloud Functions instances are
// ephemeral and can scale to multiple concurrent instances, so this is a
// best-effort per-instance limit, not a global one.

const { logEvent } = require('../services/auditLog');

function makeLimiter({ windowMs, max }) {
  const ipCalls = new Map();

  function limiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const calls = (ipCalls.get(ip) || []).filter(t => now - t < windowMs);
    calls.push(now);
    ipCalls.set(ip, calls);

    if (calls.length > max) {
      const retryAfterSec = Math.ceil((calls[0] + windowMs - now) / 1000);
      res.set('Retry-After', String(Math.max(retryAfterSec, 1)));
      logEvent(req, 'RATE_LIMIT_EXCEEDED', { windowMs, max });
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  }

  setInterval(() => {
    const cutoff = Date.now() - windowMs;
    for (const [ip, calls] of ipCalls) {
      if (!calls.some(t => t > cutoff)) ipCalls.delete(ip);
    }
  }, 5 * 60 * 1000);

  return limiter;
}

// General-purpose limiter, applied to every request.
const rateLimiter = makeLimiter({ windowMs: 60 * 1000, max: 60 });

// Stricter limiter for privileged, abuse-prone routes (role/password
// changes) — applied on top of the general limiter, not instead of it.
const strictRateLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, max: 10 });

// Anonymous-submission forms (no auth, no per-user identity to key off of)
// — bounded harder than a signed-in user's general traffic to blunt
// scripted spam against org-request/rental-application/waitlist/contact
// forms, still generous enough for a real applicant retrying a typo.
const publicSubmitRateLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, max: 8 });

module.exports = { rateLimiter, strictRateLimiter, publicSubmitRateLimiter };
