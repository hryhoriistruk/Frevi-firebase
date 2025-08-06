import React, { useState, useEffect } from 'react';
import { dbRef, push, set, onValue } from 'firebase/database';
import { db } from '../firebase';

function Chat({ senderId, receiverId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Generate chat room ID (sorted to ensure consistency)
    const chatId = [senderId, receiverId].sort().join('_');

    useEffect(() => {
        // Listen for new messages
        const messagesRef = dbRef(db, `messages/${chatId}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setMessages(Object.values(data));
        });
    }, [chatId]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const messageRef = push(dbRef(db, `messages/${chatId}`));
        await set(messageRef, {
            id: messageRef.key,
            senderId,
            text: message,
            timestamp: Date.now()
        });
        setMessage('');
    };

    return (
        <div className="chat">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={msg.senderId === senderId ? 'sent' : 'received'}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;