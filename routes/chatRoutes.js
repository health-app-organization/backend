const express = require('express');
const router = express.Router();
const { join } = require('node:path');

// Define user-related routes
router.get('/', (req, res) => {
    //console.log(__dirname)
    res.sendFile(join(__dirname, '../views/index.html'));
});

module.exports = router;