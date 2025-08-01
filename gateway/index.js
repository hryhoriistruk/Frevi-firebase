// gateway/index.js
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/users',
    createProxyMiddleware({
        target: 'http://user-service:3001',
        pathRewrite: { '^/users': '' }
    })
);