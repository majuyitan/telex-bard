// ./src/routes/tick.js

const express = require('express');
const router = express.Router();
const { getRandomPoem } = require('../utils/getRandomPoem');

router.post('/', (req, res) => {
    try {
        const poem = getRandomPoem();
        
        if (!poem) {
            return res.status(404).json({ error: 'No poem found' });
        }

        console.log('Tick endpoint called. Sending poem:', poem.title);

        res.json({
            title: poem.title,
            author: poem.author,
            date: poem.date,
            content: poem.content
        });
    } catch (error) {
        console.error('Error in /tick route:', error);
        res.status(500).json({ error: 'An error occurred while fetching the poem' });
    }
});

module.exports = router;
