import { useState, useEffect } from 'react';

function getMessages() {
    // This should be your actual API call implementation
    return Promise.resolve({ data: [] });
}

export default function MessagesPage() {
    const [messages, setMessages] = useState([
        {id: 1, text: "Привіт!", sender: "user"},
        {id: 2, text: "Як справи?", sender: "other"},
    ]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        getMessages().then(response => setMessages(response.data));
    }, []);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, {id: Date.now(), text: newMessage, sender: "user"}]);
        setNewMessage("");
    };

    return (
        <div className="messenger">
            <div className="chat-list">...</div>
            <div className="chat-window">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}