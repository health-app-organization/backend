const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');

// Define user-related routes
router.get('/', orderController.getAllOrders);
router.post('/create', orderController.createOrder);
router.get('/:id', orderController.getOrderById);

module.exports = router;
