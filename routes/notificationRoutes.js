const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define user-related routes
router.get('/', notificationController.getAllNotifications);
router.post('/create', notificationController.createNotification);
router.get('/:id', notificationController.getNotificationById);

module.exports = router;
