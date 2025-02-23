const axios = require('axios');
const { postToTelex } = require('../../src/utils/telexPoster');

jest.mock('axios');

beforeEach(() => {
	jest.clearAllMocks(); // Clear all mock calls and instances
});

describe('postToTelex', () => {
    const mockPoem = {
        name: 'Test Poem',
        author: 'Test Author',
        date: '2025',
        content: 'This is a test poem.'
    };

    it('should post poem to the specified URL', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });

        await postToTelex('http://example.com/webhook', mockPoem);

        expect(axios.post).toHaveBeenCalledWith('http://example.com/webhook', {
            event_name: 'Poem of the Day',
            message: `📖 Test Poem\nby Test Author (2025)\n\nThis is a test poem.`,
            status: 'success',
            username: 'Telex Bard',
        });
    });

    it('should handle errors gracefully', async () => {
        axios.post.mockRejectedValue(new Error('Network Error'));

        await postToTelex('http://example.com/webhook', mockPoem);

        expect(axios.post).toHaveBeenCalledTimes(1);
        // Check console error message
    });
});
