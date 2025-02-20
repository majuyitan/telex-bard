// ./src/routes/tick.js

const express = require('express');
const router = express.Router();
const { getRandomPoem } = require('../utils/getRandomPoem');
const axios = require('axios');

const TELEX_CHANNEL_ID = '01951ea4-70e4-71fd-82a7-b0e3d5e5cf82'; // Replace with your Telex channel ID
const TELEX_API_URL = `https://api.telex.com/channels/${TELEX_CHANNEL_ID}/messages`; // Update with the actual Telex API base URL
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN_HERE'; // Replace with your Telex bearer token

router.post('/', async (req, res) => {
    try {
        const poem = getRandomPoem();
        const poemContent = `
*${poem.title}* by *${poem.author}* (${poem.date})

${poem.content}
`;

        // Send the poem as a message to Telex
        const response = await axios.post(
            TELEX_API_URL,
            { content: poemContent },
            {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Poem sent to Telex:', response.data);
        res.json({ message: 'Poem sent successfully!', data: response.data });
        
    } catch (error) {
        console.error('Failed to send poem to Telex:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to send poem to Telex' });
    }
});

module.exports = router;
