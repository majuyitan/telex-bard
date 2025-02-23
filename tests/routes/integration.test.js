const request = require('supertest');
const app = require('../../src/app');

describe('GET /api/integration', () => {
    it('should return integration metadata', async () => {
        const res = await request(app).get('/api/integration');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.descriptions).toHaveProperty('app_name', 'Telex Bard');
    });
});
