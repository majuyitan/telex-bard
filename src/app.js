// ./src/app.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/integration'));
app.use('/tick', require('./routes/tick'));
app.use('/webhook', require('./routes/webhook'));
app.use('/health', require('./routes/health'));

module.exports = app;
