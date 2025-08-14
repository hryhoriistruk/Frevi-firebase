import { useState, useEffect, useRef } from 'react';
import { FiSend, FiMessageCircle, FiUser, FiMoreVertical, FiSmile } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Messenger() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! Welcome to our messenger!",
            user: { name: "Sarah", avatar: "🌸" },
            timestamp: "10:30 AM",
            isOwn: false
        },
        {
            id: 2,
            text: "Hi there! Thanks for the warm welcome 😊",
            user: { name: "You", avatar: "🦄" },
            timestamp: "10:32 AM",
            isOwn: true
        },
        {
            id: 3,
            text: "How are you doing today?",
            user: { name: "Sarah", avatar: "🌸" },
            timestamp: "10:33 AM",
            isOwn: false
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        setIsLoading(true);

        // New message object
        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            user: { name: "You", avatar: "🦄" },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');

        // Simulated response
        setTimeout(() => {
            const responses = [
                "That's interesting! Tell me more 🤔",
                "I completely agree with you! ✨",
                "Thanks for sharing that! 💕",
                "Wow, I never thought about it that way! 🌟",
                "That sounds amazing! 🎉"
            ];

            const responseMsg = {
                id: messages.length + 2,
                text: responses[Math.floor(Math.random() * responses.length)],
                user: { name: "Sarah", avatar: "🌸" },
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            };

            setMessages(prev => [...prev, responseMsg]);
            setIsLoading(false);
        }, 1000 + Math.random() * 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiMessageCircle className="text-white text-xl" />
                                </motion.div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Messenger</h1>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-purple-100 text-sm">2 people online</p>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiMoreVertical />
                            </motion.button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                        <AnimatePresence>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {msg.user.avatar}
                                        </motion.div>
                                        <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                                            msg.isOwn
                                                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-md'
                                                : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                                        }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.isOwn ? 'text-purple-100' : 'text-gray-400'}`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing indicator */}
                        <AnimatePresence>
                            {isLoading && (
                                <motion.div
                                    className="flex justify-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <div className="flex items-end space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white">
                                            🌸
                                        </div>
                                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
                                            <div className="flex space-x-1">
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                            <motion.button
                                className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-500 rounded-full flex items-center justify-center hover:from-purple-200 hover:to-pink-200 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiSmile />
                            </motion.button>

                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    disabled={isLoading}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm bg-white"
                                />
                            </div>

                            <motion.button
                                onClick={sendMessage}
                                disabled={isLoading || !newMessage.trim()}
                                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <FiSend className="text-lg" />
                                )}
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Online</span>
                            </div>
                            <span>•</span>
                            <span>End-to-end encrypted</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
