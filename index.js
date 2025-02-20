const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const poems = require('./poems.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Function to get a random poem
const getRandomPoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    return poems[randomIndex];
};

// Endpoint to return the integration JSON
app.get('/', (req, res) => {
    res.json({
        name: 'Telex Bard',
        type: 'interval',
        description: 'Delivers a poem at a specific time every day',
        interval: '0 8 * * *',
        action: 'https://telex-bard.onrender.com/send-poem'
    });
});

// Endpoint to return generated Integration JSON
app.get('/integration', (req, res) => {
	res.json({
		"data": {
			"date": {
				"created_at": "2025-02-20",
				"updated_at": "2025-02-20"
			},
			"descriptions": {
				"app_name": "Telex Bard",
				"app_description": "This integration posts a short poem or excerpt from a famous poet at a scheduled interval (daily at 8 AM). The poems are pre-stored in a local database and are selected sequentially.",
				"app_logo": "https://raw.githubusercontent.com/majuyitan/telex-bard/refs/heads/main/quill.png",
				"app_url": "https://telex-bard.onrender.com/",
				"background_color": "#fff"
			},
			"is_active": true,
			"integration_type": "interval",
			"key_features": [
				"\"Prints out a poem every day at 8 AM.\""
			],
			"author": "Majuyi",
			"integration_category": "Communication & Collaboration",
			"website": "https://telex-bard.onrender.com",
			"settings": [
				{
					"label": "Time Interval",
					"type": "number",
					"required": true,
					"default": "24"
				}
			],
			"target_url": "https://telex-bard.onrender.com/",
			"tick_url": "https://telex-bard.onrender.com/tick"
		}
	});
});

// Endpoint to send the poem
app.get('/send-poem', (req, res) => {
    const poem = getRandomPoem();
    res.json(poem);
});

app.post('/tick', (req, res) => {
    // Logic to select a poem and send it to Telex
    const poem = getRandomPoem();
    res.json({
        title: poem.title,
        author: poem.author,
        date: poem.date,
        content: poem.content
    });
});

// Schedule the task to log the poem to the console at the set time (for local testing)
cron.schedule('0 8 * * *', () => {
    console.log('Sending poem of the day...');
    console.log(getRandomPoem());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Telex Bard server is running on http://localhost:${PORT}`);
});
