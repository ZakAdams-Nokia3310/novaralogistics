'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');
const asyncHandler = require('../middlewares/asyncHandler');
const { strictRateLimiter, publicSubmitRateLimiter } = require('../middlewares/rateLimiter');
const { whoAmI, setRole, setPassword, logSessionEvent, logFailedLogin, syncOwnClaims } = require('../controllers/authController');

const router = express.Router();

router.get('/me', authenticateToken, asyncHandler(whoAmI));
router.post('/sync-claims', authenticateToken, asyncHandler(syncOwnClaims));
router.post('/set-role', strictRateLimiter, authenticateToken, requireAdmin, asyncHandler(setRole));
router.post('/set-password', strictRateLimiter, authenticateToken, requireAdmin, asyncHandler(setPassword));
router.post('/log-session-event', authenticateToken, asyncHandler(logSessionEvent));
// No authenticateToken — a failed login has no token to send.
router.post('/log-failed-login', publicSubmitRateLimiter, asyncHandler(logFailedLogin));

module.exports = router;
