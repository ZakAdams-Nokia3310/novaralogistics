'use strict';
// Express 4 does not catch rejected promises thrown from an async route
// handler — an uncaught rejection there would otherwise bypass
// index.js's error-handling middleware entirely (hanging the request
// until the platform's own timeout, or in the worst case crashing the
// instance), instead of returning the generic 500 body every other error
// path already returns. Wrapping every controller export with this
// guarantees any error, from anywhere in the handler, always reaches
// next(err) — and therefore the generic client-facing message.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;
