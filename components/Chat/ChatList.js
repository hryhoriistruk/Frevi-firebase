import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';

export default function ChatList() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await fetchWrapper('/chats');
                setChats(data);
            } catch (error) {
                console.error('Failed to fetch chats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    if (loading) return <div className="p-4">Loading chats...</div>;

    return (
        <div className="border-r border-gray-200 w-64 h-full">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Conversations</h2>
            </div>
            <div className="overflow-y-auto">
                {chats.map(chat => (
                    <Link
                        key={chat.id}
                        href={`/chat/${chat.id}`}
                        className="block p-4 border-b border-gray-100 hover:bg-gray-50"
                    >
                        <div className="font-medium">{chat.name}</div>
                        <div className="text-sm text-gray-500 truncate">
                            {chat.lastMessage?.content || 'No messages yet'}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}