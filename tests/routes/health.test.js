const request = require('supertest');
const app = require('../../src/app');

describe('GET /health', () => {
    it('should return 200 OK with "status: OK"', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: 'OK' });
    });
});
