// ./src/app.js

const express = require('express');
const cors = require('cors');
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

// Cron job for local testing
cron.schedule('0 8 * * *', () => {
    console.log('Testing scheduled poem delivery...');
    console.log(getRandomPoem());
});

module.exports = app;
