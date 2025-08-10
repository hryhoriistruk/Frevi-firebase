import React, { useState, useRef, useEffect } from 'react';
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import { FaRobot, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AutoGPT from '../autogpt/autogpt';


export default function GPTAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [autogptInstance, setAutogptInstance] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const initializeAutoGPT = async () => {
            try {
                const instance = new AutoGPT({
                    OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY,
                    MODEL: 'gpt-3.5-turbo',
                    TEMPERATURE: 0.7
                });
                setAutogptInstance(instance);
                setMessages([{
                    text: "Hello! I'm your AI assistant. How can I help you today?",
                    sender: 'ai'
                }]);
            } catch (error) {
                console.error("Failed to initialize AutoGPT:", error);
                setMessages([{
                    text: "Failed to initialize AI assistant. Please try again later.",
                    sender: 'ai'
                }]);
            }
        };

        initializeAutoGPT();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !autogptInstance) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await autogptInstance.run([
                { role: "system", content: "You are a helpful assistant for Frevi professional network." },
                { role: "user", content: input }
            ]);

            setMessages(prev => [...prev, {
                text: response || "I couldn't process your request",
                sender: 'ai'
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                text: "Error processing your request",
                sender: 'ai'
            }]);
            console.error("AutoGPT processing error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const quickQuestions = [
        "How to improve my profile?",
        "Best practices for freelancing",
        "How to network effectively?",
        "Tips for job interviews",
        "Writing a winning proposal"
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <HeadTag title="Frevi - AI Assistant" />
            <Navbar />

            <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4">
                            <FaRobot className="text-white text-3xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#0C4A6E] mb-2">Frevi AI Assistant</h1>
                        <p className="text-gray-600">Powered by AutoGPT</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-xl font-semibold text-[#0C4A6E] mb-4">Quick questions:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {quickQuestions.map((question, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
                                    onClick={() => setInput(question)}
                                >
                                    <p className="text-gray-800">{question}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                    >
                        <div className="h-96 p-4 overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <FaRobot className="text-4xl mb-4 text-purple-500" />
                                    <p>Ask me anything about your professional journey!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                                            >
                                                {message.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                                                <FaSpinner className="animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 transition"
                                >
                                    {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}