'use strict';

const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const requireAdmin = require('../middlewares/requireAdmin');
const { whoAmI, setRole } = require('../controllers/authController');

const router = express.Router();

router.get('/me', authenticateToken, whoAmI);
router.post('/set-role', authenticateToken, requireAdmin, setRole);

module.exports = router;
