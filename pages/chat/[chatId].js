import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import ChatWindow from '../../../Frevi-firebaseo/components/Chat/ChatWindow';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';

// Додаємо getServerSideProps для отримання даних на сервері
export async function getServerSideProps(context) {
    const { chatId } = context.params;

    try {
        const data = await fetchWrapper(`/chats/${chatId}`);
        return {
            props: {
                initialChat: data
            }
        };
    } catch (error) {
        console.error('Failed to fetch chat', error);
        return {
            props: {
                initialChat: null
            }
        };
    }
}

export default function ChatDetailPage({ initialChat }) {
    const router = useRouter();
    const { chatId } = router.query;
    const [chat, setChat] = useState(initialChat);

    // Додаткове оновлення даних на клієнті, якщо потрібно
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
                {chat ? (
                    <ChatWindow chat={chat} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading chat or chat not found...</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}