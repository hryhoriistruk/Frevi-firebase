// pages/chat.js
import { useEffect, useState } from 'react';
import { socket } from '../lib/websocket';
import MessageList from '../components/Chat/MessageList';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.connect(localStorage.getItem('token'));

        socket.on('message', (newMessage) => {
            setMessages(prev => [...prev, newMessage]);
        });

        return () => socket.removeAllListeners();
    }, []);

    return (
        <div className="chat-container">
            <MessageList messages={messages} />
        </div>
    );
}