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

// Cron-job for Local testing
// Define the tick endpoint URL (use your actual endpoint)
const TICK_ENDPOINT = `http://${process.env.TELEX_WEBHOOK_URL}/tick`;

// Schedule the tick endpoint to run every 6 AM for test as opposed to the 8 AM for feature
cron.schedule('0 6 * * *', async () => {
    try {
        console.log('Running scheduled task: Calling /tick endpoint');
        const response = await axios.post(TICK_ENDPOINT);
        console.log('Tick response:', response.data);
    } catch (error) {
        console.error('Error calling /tick endpoint:', error?.response?.data || error.message);
    }
});

module.exports = app;
