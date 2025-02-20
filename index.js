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
        action: 'https://asdfasdfasdf.com/send-poem'
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
