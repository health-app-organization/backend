const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authenticateToken');
const passwordController = require('../controllers/passwordController')

router.post('/:status/login', authController.login);
router.post('/:status/me', auth.authenticateToken, authController.me);
router.post('/forgot_password', passwordController.verifyEmail);
router.post('/verify_otp', auth.authenticateToken, passwordController.verifyOTP);
router.post('/reset_password', auth.authenticateToken, passwordController.resetPassword);

module.exports = router;