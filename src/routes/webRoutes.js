const express = require('express');
const router = express.Router();
const path = require('path');
const loginController = require('../controllers/web/loginController')
const { authenticateCookieToken } = require('../middleware/authenticateToken')

router.get('/auth/login', loginController.sendLoginForm);
router.post('/auth/login', loginController.login);
router.get('/auth/dashboard', authenticateCookieToken, loginController.dashboard);

module.exports = router;