const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authenticateToken');
const passwordController = require('../controllers/passwordController')

router.post('/:status/login', authController.login);
router.post('/:status/register', authController.register);
router.post('/:status/me', auth.authenticateToken, authController.me);
router.post('/:status/password/reset/request-otp', passwordController.sendOTP);
router.post('/:status/password/reset/verify-otp', auth.authenticateToken, passwordController.verifyOTP);
router.post('/:status/password/reset/reset_password', auth.authenticateToken, passwordController.resetPassword);

module.exports = router;