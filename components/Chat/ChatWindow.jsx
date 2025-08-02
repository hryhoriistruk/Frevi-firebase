import { useState, useEffect } from 'react';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';

export default function ChatWindow({ chatId }) {
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadChat = async () => {
            try {
                const data = await fetchWrapper(`/chats/${chatId}`);
                setChat(data);
            } catch (err) {
                setError(err.message || 'Failed to load chat');
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, [chatId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading chat data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-full">
            {/* Your chat UI implementation */}
            <div className="p-4">
                <h2 className="text-xl font-bold">{chat?.title || 'Chat'}</h2>
                {/* Render chat messages etc. */}
            </div>
        </div>
    );
}