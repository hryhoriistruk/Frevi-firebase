import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Временно закомментируем Layout для диагностики
// import Layout from '../../components/layout/Layout';

// Client-side only chat component
const ChatWindow = dynamic(
    () => import('../../components/Chat/ChatWindow'),
    { ssr: false }
);

// Временный простой Layout для тестирования
const SimpleLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
            {children}
        </div>
    </div>
);

export default function ChatPage() {
    const router = useRouter();
    const { chatId } = router.query;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!chatId) {
            router.replace('/');
        }
    }, [chatId, router]);

    if (!isMounted) {
        return (
            <SimpleLayout>
                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                    <p>Loading chat...</p>
                </div>
            </SimpleLayout>
        );
    }

    return (
        <SimpleLayout>
            <div className="h-[calc(100vh-6rem)]">
                {chatId ? (
                    <ChatWindow chatId={chatId} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Chat not found</p>
                    </div>
                )}
            </div>
        </SimpleLayout>
    );
}

// Полностью отключаем SSR для этой страницы
export async function getServerSideProps() {
    return {
        props: {}
    };
}