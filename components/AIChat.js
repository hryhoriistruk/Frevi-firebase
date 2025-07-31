'use client';
import { useState } from 'react';

export default function AIChat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);

        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [...messages, userMessage] })
        });

        const aiMessage = await response.json();
        setMessages(prev => [...prev, aiMessage]);
    };

    return (
        <div className="chat-container">
            {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                    {msg.content}
                </div>
            ))}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}