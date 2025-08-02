import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchWrapper } from '@lib/utils/fetchWrapper';

export default function ChatPage() {
    const router = useRouter();
    const { chatId } = router.query;
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chatId) {
            router.replace('/');
            return;
        }

        const loadChat = async () => {
            try {
                const data = await fetchWrapper(`/chats/${chatId}`);
                setChat(data);
            } catch (error) {
                console.error('Failed to load chat', error);
                router.replace('/');
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, [chatId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                <p>Loading chat...</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-6rem)]">
            {/* Your chat UI implementation */}
            <h1>{chat?.title || 'Chat'}</h1>
            {/* Chat messages and interface */}
        </div>
    );
}