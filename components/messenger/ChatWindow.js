import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function ChatWindow({ chatId, currentUserId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef();

    useEffect(() => {
        // Initialize Socket.io connection
        socketRef.current = io('http://your-backend-url');

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket');
            socketRef.current.emit('joinChat', { chatId, userId: currentUserId });
        });

        socketRef.current.on('newMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [chatId, currentUserId]);

    const handleSend = () => {
        if (newMessage.trim()) {
            socketRef.current.emit('sendMessage', {
                chatId,
                senderId: currentUserId,
                content: newMessage,
                type: 'text'
            });
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}