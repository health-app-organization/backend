const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const schedule = require("node-schedule");
const jobs = require("./src/scheduler/nodeScheduler");
const initializeChatSocket = require('./chat');

const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const api = `http://${HOST}:${PORT}`;

//Import middleware
const auth = require('./src/middleware/authenticateToken');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Set the view engine (optional)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));


// Import route modules
const apiRoutes = require('./src/routes/apiRoutes');
const webRoutes = require('./src/routes/webRoutes');
const { log } = require('console');
const { randomUUID } = require('crypto');

app.get('/', (req, res) => {
    res.send('Welcome to Health API')
})

app.use('/api', apiRoutes);
app.use('/web', webRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

jobs.initializeReminders();

// Initialize chat socket
initializeChatSocket(httpServer, api);



module.exports = { httpServer, app };
