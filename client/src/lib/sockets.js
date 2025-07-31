import { io } from 'socket.io-client';

let socket;

export const initSocket = (token) => {
    socket = io(process.env.NEXT_PUBLIC_WS_URL, {
        auth: { token },
        reconnectionAttempts: 5
    });

    socket.on('connect_error', (err) => {
        console.error('Socket error:', err);
    });

    return socket;
};

export const joinChatRoom = (chatId) => {
    if (socket) socket.emit('joinRoom', chatId);
};

export const sendMessage = (messageData) => {
    if (socket) socket.emit('sendMessage', messageData);
};