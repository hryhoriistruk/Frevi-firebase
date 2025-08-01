const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('express-jwt');

const app = express();

// JWT Auth Middleware
app.use(jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'user'
}).unless({
    path: ['/auth/login', '/docs']
}));

// Service Routing
const services = {
    '/users': 'http://user-service:3001',
    '/orders': 'http://order-service:3002',
    '/messages': 'http://messenger-service:3003'
};

Object.entries(services).forEach(([path, target]) => {
    app.use(path, createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: '' }
    }));
});

// Swagger Docs
app.use('/docs', express.static('api-docs'));

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});