const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user-related routes
router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
