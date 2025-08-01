// services/payment/queue.js
const { Worker } = require('bullmq');

const paymentWorker = new Worker('payment-queue', async job => {
    const { orderId, amount } = job.data;
    try {
        await processPayment(orderId, amount);
    } catch (error) {
        await retryPayment(job);
    }
}, { connection: redisClient });