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
        <div className="chat-app">
            <div className="header">WebSocket Chat</div>
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        <div className="content">{msg.text}</div>
                        <div className="time">{new Date().toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .chat-app {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    max-width: 500px;
                    margin: 0 auto;
                    background: #f8f9fa;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .header {
                    padding: 15px;
                    background: #6c5ce7;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: bold;
                    text-align: center;
                }

                .messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: linear-gradient(180deg, #f5f7fa 0%, #e4e8eb 100%);
                }

                .message {
                    margin-bottom: 15px;
                    display: flex;
                    flex-direction: column;
                    max-width: 70%;
                }

                .message.user {
                    align-self: flex-end;
                    align-items: flex-end;
                }

                .message:not(.user) {
                    align-self: flex-start;
                    align-items: flex-start;
                }

                .content {
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.95rem;
                    line-height: 1.4;
                    word-break: break-word;
                }

                .message.user .content {
                    background: #6c5ce7;
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .message:not(.user) .content {
                    background: white;
                    color: #333;
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }

                .time {
                    margin-top: 4px;
                    font-size: 0.7rem;
                    color: #7f8c8d;
                }

                .input-area {
                    display: flex;
                    padding: 15px;
                    background: white;
                    border-top: 1px solid #e0e0e0;
                }

                input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 1px solid #ddd;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.3s;
                }

                input:focus {
                    border-color: #6c5ce7;
                    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
                }

                button {
                    margin-left: 10px;
                    width: 45px;
                    height: 45px;
                    border: none;
                    border-radius: 50%;
                    background: #6c5ce7;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                button:hover {
                    background: #5649c0;
                    transform: translateY(-2px);
                }

                button:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
}