/**
 * WebSocket service for real-time chat.
 * Uses Redis Pub/Sub for scaling.
 */
const Redis = require('ioredis');
const { Server } = require('socket.io');

class SocketService {
    constructor(server) {
        this.redis = new Redis(process.env.REDIS_URL);
        this.io = new Server(server, { cors: { origin: "*" } });
        this.setupSocketEvents();
    }

    setupSocketEvents() {
        this.io.on('connection', (socket) => {
            // Join a chat room
            socket.on('join_chat', (chatId) => {
                socket.join(chatId);
            });

            // Broadcast messages
            socket.on('send_message', (message) => {
                this.redis.publish('chat_message', JSON.stringify(message));
                this.io.to(message.chatId).emit('new_message', message);
            });
        });
    }
}

module.exports = SocketService;