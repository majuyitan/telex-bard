// ./src/routes/tick.js

const express = require('express');
const axios = require('axios'); // For making HTTP requests
const router = express.Router();
const { getRandomPoem } = require('../utils/getRandomPoem');

// Load the webhook URL from environment variables
const TELEX_WEBHOOK_URL = process.env.TELEX_WEBHOOK_URL;

router.post('/', async (req, res) => {
    try {
        const poem = getRandomPoem();

        if (!poem) {
            return res.status(404).json({ error: 'No poem found' });
        }

        console.log('Tick endpoint called. Sending poem:', poem.title);

		// Prepare the payload for Telex
		const payload = {
			event_name: 'Poem of the Day',
			message: `📖 ${poem.name}\nby ${poem.author} (${poem.date})\n\n${poem.content}`,
			status: 'success',
			username: 'Telex Bard',
		};

        // Send the poem to Telex via webhook
        const response = await axios.post(TELEX_WEBHOOK_URL, payload);
        console.log('Poem posted to Telex:', response.data);

        res.json({
            success: true,
            message: 'Poem sent to Telex successfully',
            poem: payload
        });

    } catch (error) {
        console.error('Error in /tick route:', error?.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred while sending the poem to Telex' });
    }
});

module.exports = router;
