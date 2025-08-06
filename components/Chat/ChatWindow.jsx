import { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../../firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const unsubscribe = getMessages((data) => {
            setMessages(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        await sendMessage({
            text: newMessage,
            userId: user.uid,
            userName: user.displayName,
            timestamp: new Date()
        });
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-3 p-3 rounded-lg max-w-[80%] ${msg.userId === user?.uid ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'}`}
                    >
                        <p className="font-semibold">{msg.userName}</p>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} className="flex border-t p-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-l focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
}