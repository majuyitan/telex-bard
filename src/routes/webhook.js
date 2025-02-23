// ./src/routes/webhook.js

const express = require('express');
const router = express.Router();

router.post('/webhook', (req, res) => {
	console.log('Webhook received:', req.body); // Logs Telex's response
	res.sendStatus(200); // Responds OK to Telex
});

module.exports = router;
