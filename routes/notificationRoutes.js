const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define user-related routes
router.get('/:status/:id', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.post('/create', notificationController.createNotification);
router.put('/update/:id', notificationController.updateNotification);
router.delete('/delete/:id', notificationController.deleteNotification);

module.exports = router;
