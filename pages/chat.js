import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { db } from '../firebase/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { conversations, markAsRead } = useChat();
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Удалите автоматическое переспрямування
        // if (!user) {
        //     router.replace('/');
        //     return;
        // }

        if (user && conversations.length > 0 && !activeConversation) {
            setActiveConversation(conversations[0].id);
        }
    }, [user, conversations]);

    useEffect(() => {
        if (activeConversation && user) {
            markAsRead(activeConversation);
            const q = query(
                collection(db, 'conversations', activeConversation, 'messages'),
                orderBy('timestamp', 'asc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const msgs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgs);
            });

            return () => unsubscribe();
        }
    }, [activeConversation, markAsRead, user]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation || !user) return;

        await addDoc(collection(db, 'conversations', activeConversation, 'messages'), {
            text: newMessage,
            sender: user.uid,
            timestamp: serverTimestamp(),
            read: false
        });

        setNewMessage('');
    };

    // Показывать форму входа вместо переспрямування
    if (!user) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] bg-gray-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Chat Access</h2>
                            <p className="text-gray-600">You need to be logged in to access the chat feature.</p>
                        </div>

                        <div className="space-y-4">
                            <Link href="/account-security/login">
                                <button className="w-full bg-[#0077b5] hover:bg-[#006097] text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                                    Log In
                                </button>
                            </Link>

                            <Link href="/account-security/signup">
                                <button className="w-full border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                                    Sign Up
                                </button>
                            </Link>

                            <button
                                onClick={() => router.push('/')}
                                className="w-full text-gray-500 hover:text-gray-700 py-2 font-medium transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex h-[calc(100vh-6rem)]">
                {/* Conversation list */}
                <div className="w-1/4 border-r bg-gray-50">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold">Conversations</h2>
                    </div>
                    {conversations.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            <p>No conversations yet</p>
                            <p className="text-sm mt-2">Start networking to begin chatting!</p>
                        </div>
                    ) : (
                        conversations.map(convo => (
                            <div
                                key={convo.id}
                                onClick={() => setActiveConversation(convo.id)}
                                className={`p-4 cursor-pointer hover:bg-gray-100 ${
                                    activeConversation === convo.id ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="font-medium">
                                    {convo.participantsNames?.join(', ') || 'Chat'}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    {convo.lastMessage?.text || 'No messages yet'}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message area */}
                <div className="flex-1 flex flex-col">
                    {activeConversation ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-4">
                                {messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <p>No messages in this conversation yet. Start chatting!</p>
                                    </div>
                                ) : (
                                    messages.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={`mb-4 flex ${
                                                msg.sender === user.uid ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                                                msg.sender === user.uid
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200'
                                            }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <form onSubmit={handleSendMessage} className="p-4 border-t">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <p className="text-lg mb-2">Welcome to Frevi Chat!</p>
                                <p>Select a conversation to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}