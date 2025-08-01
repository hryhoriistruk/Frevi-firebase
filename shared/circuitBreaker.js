const CircuitBreaker = require('opossum');

const breakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
};

function createBreaker(action, fallback) {
    const breaker = new CircuitBreaker(action, breakerOptions);
    breaker.fallback(fallback);

    breaker.on('failure', (error) => {
        console.error(`Circuit breaker failure: ${error.message}`);
    });

    return breaker;
}

// Example usage
const fetchWithBreaker = createBreaker(
    async (url) => {
        const response = await axios.get(url);
        return response.data;
    },
    () => ({ error: 'Service unavailable' })
);

module.exports = { createBreaker };