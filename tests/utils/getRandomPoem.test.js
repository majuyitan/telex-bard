const { getRandomPoem } = require('../../src/utils/getRandomPoem');
const poems = require('../../src/poems.json');

describe('Utility Function: getRandomPoem', () => {
    it('should return a poem with name, author, date and content', () => {
        const poem = getRandomPoem();
        expect(poem).toHaveProperty('name');
        expect(poem).toHaveProperty('author');
        expect(poem).toHaveProperty('date');
        expect(poem).toHaveProperty('content');
    });

    it('should return a poem from the predefined list', () => {
        const poem = getRandomPoem();
        expect(poems).toContainEqual(poem);
    });
});
