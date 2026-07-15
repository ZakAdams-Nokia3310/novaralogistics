'use strict';
// In-memory IP rate limiter — same approach as the static server's limiter
// in server.js, kept dependency-free. Note: Cloud Functions instances are
// ephemeral and can scale to multiple concurrent instances, so this is a
// best-effort per-instance limit, not a global one.

const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX_REQ = 60;
const ipCalls = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const calls = (ipCalls.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  calls.push(now);
  ipCalls.set(ip, calls);

  if (calls.length > RATE_MAX_REQ) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}

setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, calls] of ipCalls) {
    if (!calls.some(t => t > cutoff)) ipCalls.delete(ip);
  }
}, 5 * 60 * 1000);

module.exports = { rateLimiter };
