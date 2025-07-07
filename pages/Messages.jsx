import { useState } from 'react';

export default function MessagesPage() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Привіт!", sender: "user" },
        { id: 2, text: "Як справи?", sender: "other" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
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
                placeholder="Написати повідомлення..."
            />
            <button onClick={handleSend}>Надіслати</button>
        </div>
    );
}