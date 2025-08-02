const { initTracer } = require('jaeger-client');

const tracer = initTracer({
    serviceName: process.env.SERVICE_NAME,
    sampler: {
        type: 'const',
        param: 1
    },
    reporter: {
        logSpans: true,
        agentHost: process.env.JAEGER_AGENT_HOST
    }
});

function traceMiddleware(req, res, next) {
    const span = tracer.startSpan(req.path);
    span.setTag('http.method', req.method);

    res.on('finish', () => {
        span.setTag('http.status_code', res.statusCode);
        span.finish();
    });

    next();
}

module.exports = { tracer, traceMiddleware };