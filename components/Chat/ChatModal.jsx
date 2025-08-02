import { useState, useEffect } from 'react';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';

export default function ChatModal({ chatId, onClose }) {
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChat = async () => {
            try {
                const data = await fetchWrapper(`/chats/${chatId}`);
                setChat(data);
            } catch (error) {
                console.error('Failed to load chat', error);
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, [chatId]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {loading ? 'Loading...' : chat?.title || 'Chat'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    {loading ? (
                        <p>Loading chat messages...</p>
                    ) : (
                        <div>
                            {/* Render your chat messages here */}
                            {chat?.messages?.map(message => (
                                <div key={message.id} className="mb-4">
                                    <p>{message.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}