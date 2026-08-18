'use strict';
// In-memory IP rate limiters — same approach as the static server's limiter
// in server.js, kept dependency-free. Note: Cloud Functions instances are
// ephemeral and can scale to multiple concurrent instances, so this is a
// best-effort per-instance limit, not a global one.

const slowDown = require('express-slow-down');
const { ipKeyGenerator } = require('express-rate-limit');
const { logEvent } = require('../services/auditLog');

// Default key is per-IP. Pass keyFn to key per-authenticated-user instead
// (only meaningful for limiters mounted AFTER authenticateToken, so
// req.user is already populated) — a malicious signed-in user rotating IPs
// shouldn't be able to reset their own quota, and legitimate users behind a
// shared/corporate IP shouldn't share one.
function makeLimiter({ windowMs, max, keyFn }) {
  const ipCalls = new Map();
  const getKey = keyFn || ((req) => req.ip);

  function limiter(req, res, next) {
    const ip = getKey(req);
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

// ipKeyGenerator normalizes an IPv6 address to its /56 subnet before use —
// without it, a single client can cycle through addresses within its own
// subnet to dodge an IP-keyed limit (express-slow-down's authSlowDown below
// enforces this at deploy time and throws ERR_ERL_KEY_GEN_IPV6 without it).
const userOrIpKey = (req) => (req.user && req.user.id) ? `u:${req.user.id}` : `ip:${ipKeyGenerator(req.ip)}`;

// General-purpose limiter, applied to every request before routing —
// req.user isn't populated yet at this point, so this is necessarily
// IP-keyed. It's the outer defensive layer against unauthenticated flooding;
// per-user limits kick in on top of it once a route has authenticated.
const rateLimiter = makeLimiter({ windowMs: 60 * 1000, max: 60 });

// Stricter limiter for privileged, abuse-prone routes (role/password/TOTP
// changes) — applied on top of the general limiter, not instead of it.
// Mounted AFTER authenticateToken at the route level (see authRoutes.js /
// totpRoutes.js) specifically so req.user is available here and this keys
// per-account rather than per-IP — otherwise a malicious signed-in user
// could reset their own quota just by rotating IPs.
const strictRateLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, max: 10, keyFn: userOrIpKey });

// Second layer on top of strictRateLimiter, on the same privileged routes
// (role/password/email/TOTP changes) — progressively slows responses down
// BEFORE the hard 10-per-15min cutoff above is even reached, so a scripted
// attacker pays an increasing time cost per attempt instead of getting instant
// responses right up until the wall. Same per-account keying as
// strictRateLimiter, for the same reason (a malicious signed-in user
// rotating IPs shouldn't reset this either).
const authSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 3,
  delayMs: (hits) => (hits - 3) * 500, // 0ms for the first 3 hits, then +500ms per hit
  maxDelayMs: 5000,
  keyGenerator: userOrIpKey,
});

// Per-user limit on the general authenticated data-access endpoint
// (/api/data/execute) — every dashboard read/write funnels through this one
// route, so it's the highest-value target for a compromised or malicious
// account to hammer. Also mounted after authenticateToken.
const dataExecuteRateLimiter = makeLimiter({ windowMs: 60 * 1000, max: 120, keyFn: userOrIpKey });

// Anonymous-submission forms (no auth, no per-user identity to key off of)
// — bounded harder than a signed-in user's general traffic to blunt
// scripted spam against org-request/rental-application/waitlist/contact
// forms, still generous enough for a real applicant retrying a typo.
const publicSubmitRateLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, max: 8 });

module.exports = { rateLimiter, strictRateLimiter, authSlowDown, dataExecuteRateLimiter, publicSubmitRateLimiter };
