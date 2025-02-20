// ./src/routes/index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        name: 'Telex Bard',
        type: 'interval',
        description: 'Delivers a poem at a specific time every day',
        interval: '0 8 * * *',
        action: 'https://telex-bard.onrender.com/send-poem',
        integration: 'https://telex-bard.onrender.com/api/integration.json'
    });
});

module.exports = router;

