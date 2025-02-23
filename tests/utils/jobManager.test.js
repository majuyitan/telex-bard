const { scheduleJob, stopJob } = require('../../src/utils/jobManager');
const cron = require('node-cron');

jest.mock('node-cron');

describe('Job Manager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should schedule a new job', () => {
        const mockJob = { stop: jest.fn() };
        cron.schedule.mockReturnValue(mockJob);

        const task = jest.fn();
        scheduleJob('0 9 * * *', 'http://example.com/webhook', task);

        expect(cron.schedule).toHaveBeenCalledWith('0 9 * * *', task);
    });

    it('should stop and remove an existing job', () => {
        const mockJob = { stop: jest.fn() };
        cron.schedule.mockReturnValue(mockJob);

        const url = 'http://example.com/webhook';
        scheduleJob('* * * * *', url, jest.fn());
        stopJob(url);

        expect(mockJob.stop).toHaveBeenCalled();
    });

    it('should not throw an error if stopping a non-existing job', () => {
        expect(() => stopJob('http://non-existing.com')).not.toThrow();
    });
});
