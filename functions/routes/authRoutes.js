'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');
const asyncHandler = require('../middlewares/asyncHandler');
const { strictRateLimiter, authSlowDown, publicSubmitRateLimiter } = require('../middlewares/rateLimiter');
const { whoAmI, setRole, setPassword, setEmail, logSessionEvent, logFailedLogin, syncOwnClaims } = require('../controllers/authController');

const router = express.Router();

router.get('/me', authenticateToken, asyncHandler(whoAmI));
router.post('/sync-claims', authenticateToken, asyncHandler(syncOwnClaims));
// authenticateToken runs first so strictRateLimiter/authSlowDown (see
// rateLimiter.js) can key their quota per-account instead of per-IP.
router.post('/set-role', authenticateToken, authSlowDown, strictRateLimiter, requireAdmin, asyncHandler(setRole));
router.post('/set-password', authenticateToken, authSlowDown, strictRateLimiter, requireAdmin, asyncHandler(setPassword));
router.post('/set-email', authenticateToken, authSlowDown, strictRateLimiter, requireAdmin, asyncHandler(setEmail));
router.post('/log-session-event', authenticateToken, asyncHandler(logSessionEvent));
// No authenticateToken — a failed login has no token to send.
router.post('/log-failed-login', publicSubmitRateLimiter, asyncHandler(logFailedLogin));

module.exports = router;
