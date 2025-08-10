'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase-config';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useChat } from '@/context/ChatContext';

export default function FirestoreChat({ conversationId, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { markAsRead } = useChat();

    useEffect(() => {
        if (!conversationId || !userId) return;

        markAsRead(conversationId);
        const q = query(
            collection(db, 'conversations', conversationId, 'messages'),
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
    }, [conversationId, markAsRead, userId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !conversationId || !userId) return;

        await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
            text: newMessage,
            sender: userId,
            timestamp: serverTimestamp(),
            read: false
        });

        setNewMessage('');
    };

    return (
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
                                msg.sender === userId ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                                msg.sender === userId
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
    );
}