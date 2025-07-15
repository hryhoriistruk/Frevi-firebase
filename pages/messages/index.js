'use client';

import { useEffect, useState } from 'react';
import { ChatSocket } from '@/lib/websocket';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const chatSocket = new ChatSocket('ws://localhost:8080');
        chatSocket.onMessage((msg) => setMessages((prev) => [...prev, msg]));
        setSocket(chatSocket);

        return () => chatSocket.close();
    }, []);

    const handleSend = () => {
        if (!input.trim() || !socket) return;
        socket.send({ text: input, sender: 'user' });
        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}