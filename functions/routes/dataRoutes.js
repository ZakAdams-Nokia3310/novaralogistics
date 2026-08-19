'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const asyncHandler = require('../middlewares/asyncHandler');
const { publicSubmitRateLimiter, dataExecuteRateLimiter } = require('../middlewares/rateLimiter');
const { execute, registerSelf, deleteOwnAccount, getUserByEmail, submitPublic } = require('../controllers/dataController');

const router = express.Router();

router.post('/execute', authenticateToken, dataExecuteRateLimiter, asyncHandler(execute));
router.post('/register-self', authenticateToken, asyncHandler(registerSelf));
router.post('/delete-own-account', authenticateToken, asyncHandler(deleteOwnAccount));
router.get('/user-by-email', authenticateToken, asyncHandler(getUserByEmail));
// No authenticateToken — these are the app's anonymous-submission forms
// (org registration, rental application, waitlist join, contact inquiry).
router.post('/public-submit', publicSubmitRateLimiter, asyncHandler(submitPublic));

module.exports = router;
