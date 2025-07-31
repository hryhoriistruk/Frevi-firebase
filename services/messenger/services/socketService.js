const { Server } = require('socket.io');
const Message = require('../models/Message');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL
        }
    });

    io.on('connection', (socket) => {
        socket.on('joinRoom', (chatId) => {
            socket.join(chatId);
        });

        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const message = await Message.create({ chatId, senderId, content });

            // Відправка повідомлення всім у кімнаті
            io.to(chatId).emit('newMessage', message);

            // Публікація події в Kafka для сповіщень
            kafka.publish('NewMessage', { chatId, messageId: message.id });
        });
    });
};