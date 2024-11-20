const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.get('/user/:id', transactionController.getTransactionByUserId);
router.post('/create', transactionController.createTransaction);
router.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = router;