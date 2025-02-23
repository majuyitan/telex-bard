const request = require('supertest');
const app = require('../src/app');

describe('App Initialization', () => {
    it('should load the application without errors', () => {
        expect(app).toBeDefined();
    });
});
