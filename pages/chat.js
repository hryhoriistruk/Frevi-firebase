import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { db } from '../firebase/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import Layout from '../components/layout/Layout';

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { conversations, markAsRead } = useChat();
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!user) {
            router.replace('/');
            return;
        }

        if (conversations.length > 0 && !activeConversation) {
            setActiveConversation(conversations[0].id);
        }
    }, [user, conversations]);

    useEffect(() => {
        if (activeConversation) {
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
    }, [activeConversation, markAsRead]);

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

    if (!user) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                    <p>Redirecting to homepage...</p>
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
                    {conversations.map(convo => (
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
                    ))}
                </div>

                {/* Message area */}
                <div className="flex-1 flex flex-col">
                    {activeConversation ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-4">
                                {messages.map(msg => (
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
                                ))}
                            </div>

                            <form onSubmit={handleSendMessage} className="p-4 border-t">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="flex-1 p-2 border rounded"
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p>Select a conversation or start a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}