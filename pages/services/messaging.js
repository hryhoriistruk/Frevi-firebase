import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare, FiUser, FiRefreshCw } from 'react-icons/fi';
import MessagingService from '@/services/MessagingService';
import dynamic from 'next/dynamic';

// Динамічний імпорт для оптимізації
const MessageList = dynamic(() => import('@/components/services/MessageList'), {
    loading: () => <div className="py-4 text-center text-gray-500">Loading messages...</div>,
    ssr: false
});

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3
        }
    })
};

export default function MessagingPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeChat, setActiveChat] = useState('user2'); // ID активного чату
    const currentUserId = 'user1'; // Тут має бути ID поточного користувача

    // Мокові контакти для демонстрації
    const contacts = [
        { id: 'user2', name: 'John Doe', lastMessage: 'Hey, how are you doing?', unread: 2 },
        { id: 'user3', name: 'Jane Smith', lastMessage: 'About our meeting tomorrow...', unread: 0 },
        { id: 'user4', name: 'Mike Johnson', lastMessage: 'The documents are ready', unread: 5 },
    ];

    useEffect(() => {
        const unsubscribe = MessagingService.subscribeToMessages(
            currentUserId,
            activeChat,
            (msgs) => {
                setMessages(msgs);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [currentUserId, activeChat]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            await MessagingService.sendMessage(currentUserId, activeChat, newMessage);
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshMessages = () => {
        setLoading(true);
        // Тут можна додати логіку оновлення
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Бокова панель контактів */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="w-full md:w-80 bg-white border-r border-gray-200 shadow-sm"
            >
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FiMessageSquare className="text-blue-500" />
                        Chats
                    </h2>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-60px)]">
                    {contacts.map((contact) => (
                        <motion.div
                            key={contact.id}
                            variants={messageVariants}
                            custom={contacts.indexOf(contact)}
                            initial="hidden"
                            animate="visible"
                            onClick={() => setActiveChat(contact.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                activeChat === contact.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FiUser className="text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                                        {contact.unread > 0 && (
                                            <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Основна область чату */}
            <div className="flex-1 flex flex-col">
                {/* Заголовок чату */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiUser className="text-blue-500" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">
                                {contacts.find(c => c.id === activeChat)?.name || 'Chat'}
                            </h2>
                            <p className="text-xs text-gray-500">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={refreshMessages}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={loading}
                    >
                        <FiRefreshCw className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </motion.div>

                {/* Список повідомлень */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {loading ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <AnimatePresence>
                            <MessageList
                                messages={messages}
                                currentUserId={currentUserId}
                                variants={messageVariants}
                            />
                        </AnimatePresence>
                    )}
                </div>

                {/* Поле введення повідомлення */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white p-4 border-t border-gray-200 shadow-sm"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim() || loading}
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <FiSend />
                            <span className="hidden md:inline">Send</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}