'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');
const asyncHandler = require('../middlewares/asyncHandler');
const { strictRateLimiter } = require('../middlewares/rateLimiter');
const { status, enrollStart, enrollConfirm, challenge, selfRecoveryDisable, disableForUser } = require('../controllers/totpController');

const router = express.Router();

router.get('/status', authenticateToken, asyncHandler(status));
// authenticateToken runs first so strictRateLimiter (see rateLimiter.js) can
// key its quota per-account instead of per-IP.
router.post('/enroll/start', authenticateToken, strictRateLimiter, requireAdmin, asyncHandler(enrollStart));
router.post('/enroll/confirm', authenticateToken, strictRateLimiter, requireAdmin, asyncHandler(enrollConfirm));
router.post('/challenge', authenticateToken, strictRateLimiter, requireAdmin, asyncHandler(challenge));
router.post('/self-recovery-disable', authenticateToken, strictRateLimiter, requireAdmin, asyncHandler(selfRecoveryDisable));
router.post('/disable-for-user', authenticateToken, strictRateLimiter, requireAdmin, asyncHandler(disableForUser));

module.exports = router;
