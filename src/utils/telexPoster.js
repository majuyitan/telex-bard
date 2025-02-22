// ./src/utils/telexPoster.js

const axios = require('axios');

const postToTelex = async (url, poem) => {
    try {
        const payload = {
            title: poem.title,
            author: poem.author,
            date: poem.date,
            content: poem.content
        };

        const response = await axios.post(url, payload);
        console.log('Poem successfully posted to Telex:', response.data);
    } catch (error) {
        console.error('Failed to post to Telex:', error.message);
    }
};

module.exports = { postToTelex };
