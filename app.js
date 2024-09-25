const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set the view engine (optional)
app.set('view engine', 'pug');

// Import route modules
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const authRoutes = require('./routes/authRoutes');

//Import middleware
const auth = require('./middleware/authenticateToken')

// Use routes
app.use('/users', userRoutes);

//OTP routes
app.use('/otp', otpRoutes);

//auth routes
app.use('/auth', authRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

module.exports = app;
