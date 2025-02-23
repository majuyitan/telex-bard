// ./src/utils/telexPoster.js

const axios = require('axios');

const postToTelex = async (url, poem) => {
    try {
		const payload = {
			event_name: 'Poem of the Day',
			message: `📖 ${poem.name}\nby ${poem.author} (${poem.date})\n\n${poem.content}`,
			status: 'success',
			username: 'Telex Bard',
		};

        const response = await axios.post(url, payload);
        console.log('Poem successfully posted to Telex:', response.data);
    } catch (error) {
        console.error('Failed to post to Telex:', error.message);
    }
};

module.exports = { postToTelex };
