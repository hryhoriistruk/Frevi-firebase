// services/messenger/wsServer.js
const WebSocket = require('ws');
const redis = require('./redisClient');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
    redis.subscribe('chat_messages');

    redis.on('message', (channel, message) => {
        ws.send(message);
    });

    ws.on('message', (message) => {
        redis.publish('chat_messages', message);
    });
});