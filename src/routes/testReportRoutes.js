const express = require('express');
const router = express.Router();
const testReportController = require('../controllers/testReportController');

// Define user-related routes
router.get('/', testReportController.getAllTestReports);
router.post('/create', testReportController.createTestReport);
router.get('/:id', testReportController.getTestReportById);

module.exports = router;
