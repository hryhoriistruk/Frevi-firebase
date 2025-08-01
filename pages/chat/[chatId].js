import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout'; // Fixed path
import ChatWindow from '../../components/chat/ChatWindow'; // Fixed path
import { fetchWrapper } from '../../lib/utils/fetchWrapper'; // Fixed path

export default function ChatDetailPage() {
    const router = useRouter();
    const { chatId } = router.query;
    const [chat, setChat] = useState(null);

    useEffect(() => {
        const fetchChat = async () => {
            if (chatId) {
                try {
                    const data = await fetchWrapper(`/chats/${chatId}`);
                    setChat(data);
                } catch (error) {
                    console.error('Failed to fetch chat', error);
                }
            }
        };

        fetchChat();
    }, [chatId]);

    return (
        <Layout>
            <div className="h-[calc(100vh-6rem)]">
                <ChatWindow chat={chat} />
            </div>
        </Layout>
    );
}