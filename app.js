const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io');
const { authenticate } = require('./controllers/chatController');
//const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const api = `http://${HOST}:${PORT}`;

//Import middleware
const auth = require('./middleware/authenticateToken');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);

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
const appointmentRoutes = require('./routes/appointmentRoutes');
const providerRoutes = require('./routes/providerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


app.use('/chat', chatRoutes);
app.use('/users', userRoutes);
app.use('/otp', otpRoutes);
app.use('/auth', authRoutes);
app.use('/notifications', notificationRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', testReportRoutes);
app.use('/providers', providerRoutes);
app.use('/transactions', transactionRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

const io = new Server(httpServer, {
    cors: {
        origin: api,
        credentials: true
    }
});


global.onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('a user connected');

    global.chatSocket = socket;
    socket.on('add-user', async (userId) => {
        console.log(`user${userId} connected`);
        onlineUsers.set(userId, socket.id);
        console.log(onlineUsers);
    });

    socket.on('send-msg', (data) => {
        console.log('Message sent');
        console.log(data);
        const sendUserSocket = onlineUsers.get(data.providerId);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
            console.log(data);
        }
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
});


module.exports = { httpServer, app };
