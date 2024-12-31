const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');
const auth = require('../middleware/authenticateToken');
const passwordController = require('../controllers/passwordController')
const userController = require('../controllers/userController');
const notificationController = require('../controllers/notificationController');
const notificationSubscriptionController = require('../controllers/notificationSubscriptionController');
const providerController = require('../controllers/providerController');
const appointmentController = require('../controllers/appointmentController');
const orderController = require('../controllers/orderControllers');
const transactionController = require('../controllers/transactionController');
const medicineController = require('../controllers/medicineController');
const reminderController = require('../controllers/reminderController');
const testReportController = require('../controllers/testReportController');
const otpController = require('../controllers/otpController');
const referralController = require('../controllers/referralController');
const prescriptionController = require('../controllers/prescriptionController');
const conversationController = require('../controllers/chatController');



//Auth routes
router.post('/auth/:status/login', authController.login);
router.post('/auth/:status/register', authController.register);
router.post('/auth/:status/verify_otp', auth.authenticateToken, authController.verifyOTP);
router.post('/auth/:status/me', auth.authenticateToken, authController.me);
router.post('/auth/:status/password/reset/request_otp', passwordController.sendOTP);
router.post('/auth/:status/password/reset/verify_otp', auth.authenticateToken, passwordController.verifyOTP);
router.post('/auth/:status/password/reset/reset_password', auth.authenticateToken, passwordController.resetPassword);

//user routes
router.get('/user/dashboard', (req, res) => {
    res.render('dashboard', null);
});

router.get('/users/', userController.getAllUsers);
router.post('/users/create', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/update/:id', userController.updateUser);
router.delete('/users/delete/:id', userController.deleteUser);

//Provider routes
router.get('/providers/', providerController.getAllProviders);
router.get('/providers/:id', providerController.getProviderById);
router.post('/providers/create', providerController.createProvider);
router.put('/providers/update/:id', providerController.updateProvider);
router.delete('/providers/delete/:id', providerController.deleteProvider);

//Notification routes
router.get('/allow_notifications', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/notification.html'));
});

router.post('/notifications/subscribe', notificationSubscriptionController.subscribe);
router.get('/notifications/get_subscriptions/:userid', notificationSubscriptionController.getSubscriptionByUserId);

router.get('/notifications/:status/:id', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
//router.post('/notifications/create', notificationController.createNotification);
router.put('/notifications/update/:id', notificationController.updateNotification);
router.delete('/notifications/delete/:id', notificationController.deleteNotification);

//Appointment routes
router.post('/appointments/create', appointmentController.createAppointment);
router.get('/appointments/', appointmentController.getAppointments);
router.get('/appointments/:id', appointmentController.getAppointmentById);
router.get('/appointments/:status/:id', appointmentController.getAppointmentsByUserId);
router.put('/appointments/update/:id', appointmentController.updateAppointment);
router.delete('/appointments/delete/:id', appointmentController.deleteAppointment);

//Referral routes
router.post('/referrals/create', referralController.createReferral);

//Prescription routes
router.post('/prescriptions/create', prescriptionController.createPrescription);

//Order routes
router.get('/orders/', orderController.getAllOrders);
router.post('/orders/create', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);

//Transaction routes
router.get('/transactions/', transactionController.getTransactions);
router.get('/transactions/:id', transactionController.getTransactionById);
router.get('/transactions/user/:id', transactionController.getTransactionByUserId);
router.post('/transactions/create', transactionController.createTransaction);
router.delete('/transactions/delete/:id', transactionController.deleteTransaction);

// Medicine Routes
router.get('/medicines', medicineController.getAllMedicines);
router.post('/medicines', medicineController.createMedicine);
router.put('/medicines/:id', medicineController.updateMedicine);
router.delete('/medicines/:id', medicineController.deleteMedicine);

// Reminder Routes
router.get('/reminders', reminderController.getAllReminders);
router.post('/reminders', reminderController.createReminder);
router.put('/reminders/:id', reminderController.updateReminder);
router.delete('/reminders/:id', reminderController.deleteReminder);

//Test reports
router.get('/reports/', testReportController.getAllTestReports);
router.post('/reports/create', testReportController.createTestReport);
router.get('/reports/:id', testReportController.getTestReportById);

//OTP routes
router.post('/otp/generate', otpController.createOTP);
router.post('/otp/verify', otpController.verifyOTP);

//Chat routes
router.get('/chat/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chat.html'));
});

router.get('/chat/conversations', conversationController.getAllConversations);


module.exports = router;
