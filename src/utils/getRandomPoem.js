// ./src/utils/getRandomPoem.js

const poems = require('../poems.json');

const getRandomPoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    return poems[randomIndex];
};

module.exports = { getRandomPoem };
