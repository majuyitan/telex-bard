const request = require('supertest');
const express = require('express');
const tickRouter = require('../../src/routes/tick');
const { postToTelex } = require('../../src/utils/telexPoster');
const { scheduleJob, stopJob } = require('../../src/utils/jobManager');

// Mock dependencies
jest.mock('../../src/utils/telexPoster');
jest.mock('../../src/utils/jobManager');

const app = express();
app.use(express.json());
app.use('/tick', tickRouter);

describe('POST /tick', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should schedule a job with the provided return_url and settings', async () => {
        const response = await request(app)
            .post('/tick')
            .send({
                return_url: 'http://example.com/webhook',
                settings: [{ label: 'interval', default: '0 9 * * *' }]
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, message: 'Tick received and scheduled' });
        expect(stopJob).toHaveBeenCalledWith('http://example.com/webhook');
        expect(scheduleJob).toHaveBeenCalledWith(
            '0 9 * * *',
            'http://example.com/webhook',
            expect.any(Function)
        );
    });

    it('should use the default interval if none is provided', async () => {
        const response = await request(app)
            .post('/tick')
            .send({ return_url: 'http://example.com/webhook', settings: [] });

        expect(response.status).toBe(200);
        expect(scheduleJob).toHaveBeenCalledWith(
            '0 8 * * *',
            'http://example.com/webhook',
            expect.any(Function)
        );
    });

    it('should return 400 if return_url is missing', async () => {
        const response = await request(app).post('/tick').send({ settings: [] });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing return_url' });
    });

    it('should handle errors gracefully', async () => {
        scheduleJob.mockImplementation(() => { throw new Error('Schedule Error'); });

        const response = await request(app)
            .post('/tick')
            .send({ return_url: 'http://example.com/webhook', settings: [] });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'An error occurred while scheduling the task' });
    });
});
