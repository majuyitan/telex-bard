// ./src/routes/tick.js

const express = require('express');
const router = express.Router();
const { getRandomPoem } = require('../utils/getRandomPoem');
const { postToTelex } = require('../utils/telexPoster');
const { scheduleJob, stopJob } = require('../utils/jobManager');

router.post('/', async (req, res) => {
    try {
        console.log('Received tick request:', JSON.stringify(req.body, null, 2));
        let { return_url, settings } = req.body;

        // Fallback to environment variable if return_url is not provided
        return_url = return_url || process.env.TELEX_WEBHOOK_URL;
        if (!return_url) {
            return res.status(400).json({ error: 'Missing return_url' });
        }

        const intervalSetting = settings.find(s => s.label === 'interval');
        const interval = intervalSetting ? intervalSetting.default : '0 8 * * *';
        console.log(`Schedule: ${interval}`);

        // Stop any existing job for the return_url
        stopJob(return_url);

        // Schedule and store the new job
        scheduleJob(interval, return_url, async () => {
            console.log(`Running scheduled task for return_url: ${return_url}`);
            const poem = getRandomPoem();

            if (!poem) {
                console.warn('No poem found to send');
                return;
            }

            console.log('Sending poem:', poem.name);
            await postToTelex(return_url, poem);
        });

        res.json({ success: true, message: 'Tick received and scheduled' });
    } catch (error) {
        console.error('Error in /tick route:', error.message);
        res.status(500).json({ error: 'An error occurred while scheduling the task' });
    }
});

module.exports = router;
