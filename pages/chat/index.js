import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import HeadTag from '../../components/HeadTag';
import { useAuth } from '../../context/AuthContext';

export default function ChatIndex() {
    const router = useRouter();
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        // Завантажити чати користувача
        loadUserChats();
    }, []);

    const loadUserChats = async () => {
        try {
            // Тут має бути ваш API для завантаження чатів
            // const response = await fetchWrapper('/api/chats');
            // setChats(response.chats || []);

            // Поки що mock data
            setChats([
                { id: '1', title: 'Chat with John', lastMessage: 'Hey there!', updatedAt: '2024-01-15' },
                { id: '2', title: 'Project Discussion', lastMessage: 'Let\'s schedule a meeting', updatedAt: '2024-01-14' }
            ]);
        } catch (error) {
            console.error('Failed to load chats:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNewChat = () => {
        // Логіка створення нового чату
        router.push('/chat/new');
    };

    const openChat = (chatId) => {
        router.push(`/chat/${chatId}`);
    };

    if (loading) {
        return (
            <Layout>
                <HeadTag title="Chat - Loading..." />
                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                    <p>Loading your chats...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <HeadTag title="Chat - Frevi" />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Messages</h1>
                    <button
                        onClick={createNewChat}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                        Start New Chat
                    </button>
                </div>

                {chats.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">💬</div>
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">No conversations yet</h2>
                        <p className="text-gray-500 mb-6">Start your first conversation by clicking the button above</p>
                        <button
                            onClick={createNewChat}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                            Start First Chat
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => openChat(chat.id)}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 mb-2">{chat.title}</h3>
                                        <p className="text-gray-600 text-sm">{chat.lastMessage}</p>
                                    </div>
                                    <div className="text-xs text-gray-400 ml-4">
                                        {chat.updatedAt}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}