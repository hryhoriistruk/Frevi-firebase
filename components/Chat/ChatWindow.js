import { useState, useRef, useEffect } from 'react';
import { useSocket } from "../../lib/context/SocketContext";
import { useAuth } from "../../lib/context/AuthContext";

export default function ChatWindow({ chat }) {
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const { messages, sendMessage } = useSocket();
    const { user } = useAuth();

    useEffect(() => {
        if (chat?.id) {
            const filtered = messages.filter(m => m.chatId === chat.id);
            setChatMessages(filtered);
        }
    }, [messages, chat?.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && user) {
            sendMessage({
                chatId: chat.id,
                content: inputValue.trim(),
                senderId: user.id,
                type: 'text'
            });
            setInputValue('');
        }
    };

    if (!chat) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">{chat.name}</h2>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                    <div
                        key={msg.id || msg.timestamp}
                        className={`max-w-[75%] p-3 rounded-lg ${
                            msg.senderId === user?.id
                                ? 'bg-indigo-100 self-end ml-auto'
                                : 'bg-gray-100 self-start mr-auto'
                        }`}
                    >
                        <div>{msg.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : 'Just now'}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-200">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={!user}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={!inputValue.trim() || !user}
                >
                    Send
                </button>
            </form>
        </div>
    );
}