const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io');
const { authenticate } = require('./controllers/chatController');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const chatRoot = `http://${HOST}:${PORT}/chat`;
console.log(chatRoot);

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
const { log } = require('console');


//Chat routes
//app.use('/chat', chatRoutes);

app.use('/chat', chatRoutes);

app.use('/verify', (req, res) => {
    let valid = authenticate(1);
    res.send(`<h1>${valid ? 'Valid User' : 'Invalid User'}</h1>`)
})

// User routes
app.use('/users', userRoutes);

//OTP routes
app.use('/otp', otpRoutes);

//auth routes
app.use('/auth', authRoutes);

//Notification routes
app.use('/notifications', notificationRoutes);

app.use('/healthapp-backend', function (req, res) {
    res.set("Content-Type", "text/html;charset=utf-8");
    res.send("<h1>Hello from node app</h1>");
})


//Order routes
app.use('/orders', orderRoutes);

//Report routes
app.use('/reports', testReportRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

const io = new Server(httpServer, {

});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', async (msg) => {

        const response = await fetch(`${chatRoot}/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(msg),
            }
        )

        const savedMessage = await response.json();

        console.log(savedMessage);

        // io.emit('chat message', savedMessage);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
});


module.exports = { httpServer, app };
