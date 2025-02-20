// ./src/routes/tick.js

const express = require('express');
const router = express.Router();
const { getRandomPoem } = require('../utils/getRandomPoem');

router.post('/', (req, res) => {
    const poem = getRandomPoem();
    res.json({
        title: poem.title,
        author: poem.author,
        date: poem.date,
        content: poem.content
    });
});

module.exports = router;
