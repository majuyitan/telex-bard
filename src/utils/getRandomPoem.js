// ./src/utils/getRandomPoem.js

const poems = require('../poems.json');

const getRandomPoem = () => {
    const poem = poems[Math.floor(Math.random() * poems.length)];
    console.log('Selected poem:', poem); // Add this line
    return poem;
};

module.exports = { getRandomPoem };
