'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');
const requireAdminOrOrgMember = require('../middlewares/requireAdminOrOrgMember');
const asyncHandler = require('../middlewares/asyncHandler');
const { strictRateLimiter, authSlowDown } = require('../middlewares/rateLimiter');
const { status, enrollStart, enrollConfirm, challenge, selfRecoveryDisable, disableForUser } = require('../controllers/totpController');

const router = express.Router();

router.get('/status', authenticateToken, asyncHandler(status));
// authenticateToken runs first so strictRateLimiter/authSlowDown (see
// rateLimiter.js) can key their quota per-account instead of per-IP. TOTP
// is required for every admin AND every org-affiliated user (see
// totpController.js) — only disable-for-user (an admin acting on someone
// ELSE's account) stays admin-only on the caller side.
router.post('/enroll/start', authenticateToken, authSlowDown, strictRateLimiter, requireAdminOrOrgMember, asyncHandler(enrollStart));
router.post('/enroll/confirm', authenticateToken, authSlowDown, strictRateLimiter, requireAdminOrOrgMember, asyncHandler(enrollConfirm));
router.post('/challenge', authenticateToken, authSlowDown, strictRateLimiter, requireAdminOrOrgMember, asyncHandler(challenge));
router.post('/self-recovery-disable', authenticateToken, authSlowDown, strictRateLimiter, requireAdminOrOrgMember, asyncHandler(selfRecoveryDisable));
router.post('/disable-for-user', authenticateToken, authSlowDown, strictRateLimiter, requireAdmin, asyncHandler(disableForUser));

module.exports = router;
