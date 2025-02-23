// ./src/routes/index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        name: 'Telex Bard',
        type: 'interval',
        description: 'Delivers a poem at a specific time every day',
        interval: '0 8 * * *',
        health: 'https://telex-bard.onrender.com/api/health',
        integration: 'https://telex-bard.onrender.com/api/integration',
        tick: 'https://telex-bard.onrender.com/tick'
    });
});

module.exports = router;

