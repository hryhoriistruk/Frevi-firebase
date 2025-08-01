// services/messenger/socketServer.js
const WebSocket = require('ws');
const redis = require('redis');

const wss = new WebSocket.Server({ port: 8081 });
const pub = redis.createClient();
const sub = redis.createClient();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg = JSON.parse(message);

        // Store in MongoDB
        Message.create(msg);

        // Publish to Redis
        pub.publish('chat_channel', JSON.stringify(msg));
    });

    // Subscribe to Redis
    sub.on('message', (channel, message) => {
        ws.send(message);
    });
    sub.subscribe('chat_channel');
});