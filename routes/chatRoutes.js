const express = require('express');
const router = express.Router();
const { join } = require('node:path');
const chatController = require('../controllers/chatController');

// Define user-related routes
router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../views/index.html'));
});

router.get('/get_online_users', (req, res) => {
    res.status(200).json(Object.keys(global.onlineUsers));
})

router.get('/get', chatController.getMessages);
router.post('add', chatController.addMessage);
router.put('/delete/:id', chatController.deleteMessage);
router.put('/update/:id', chatController.updateMessage);

module.exports = router;