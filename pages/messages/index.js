import { useState } from 'react';

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;
        // Тут запит до Messaging-Service
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i}>{msg.text}</div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}