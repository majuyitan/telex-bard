// ./src/utils/jobManager.js

const cron = require('node-cron');

const activeJobs = new Map();

const scheduleJob = (interval, return_url, task) => {
    console.log(`Scheduling job for ${return_url}`);
    const job = cron.schedule(interval, task);

    activeJobs.set(return_url, job);
};

const stopJob = (return_url) => {
    if (activeJobs.has(return_url)) {
        console.log(`Stopping existing cron job for ${return_url}`);
        const existingJob = activeJobs.get(return_url);
        existingJob.stop();
        activeJobs.delete(return_url);
    }
};

module.exports = { scheduleJob, stopJob };
