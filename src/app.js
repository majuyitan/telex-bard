// ./src/app.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // For making HTTP requests
const cron = require('node-cron');
const { getRandomPoem } = require('./utils/getRandomPoem');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(express.static('public'));
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/integration'));
app.use('/tick', require('./routes/tick'));
app.use('/webhook', require('./routes/webhook'));

const healthRouter = require('./routes/health');
app.use('/health', healthRouter);

module.exports = app;
