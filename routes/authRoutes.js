const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authenticateToken');

router.post('/:status/login', authController.login);
router.post('/:status/me', auth.authenticateToken, authController.me);
router.post('/:status/logout', auth.authenticateToken, authController.logout);

module.exports = router;