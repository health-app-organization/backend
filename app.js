const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
//const { Server } = require('socket.io');
const socketIo = require('socket.io');

//Import middleware
const auth = require('./middleware/authenticateToken');
//const { createServer } = require('http');
const app = express();
const http = require('http');
const server = http.createServer(app);
//const server = createServer(app);
//const io = new Server(server);
const io = socketIo(server);

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
const notificationRoutes = require('./routes/notificationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const testReportRoutes = require('./routes/testReportRoutes');
const chatRoutes = require('./routes/chatRoutes');


//Chat routes
app.use('/chat', chatRoutes);

// User routes
app.use('/users', userRoutes);

//OTP routes
app.use('/otp', otpRoutes);

//auth routes
app.use('/auth', authRoutes);

//Notification routes
app.use('/notifications', notificationRoutes);

//Order routes
app.use('/orders', orderRoutes);

//Report routes
app.use('/reports', testReportRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });

io.on('connection', (socket) => {
    console.log('Client connected');
});


module.exports = app;
