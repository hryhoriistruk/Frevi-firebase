'use client'; // Add this directive at the top
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

// Dynamically import Firebase dependencies
const FirestoreChat = dynamic(
    () => import('@/components/FirestoreChat'),
    {
        ssr: false,
        loading: () => <div>Loading chat...</div>
    }
);

export default function ChatPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { conversations } = useChat();
    const [activeConversation, setActiveConversation] = useState(null);

    useEffect(() => {
        if (user && conversations.length > 0 && !activeConversation) {
            setActiveConversation(conversations[0].id);
        }
    }, [user, conversations]);

    // Show login prompt if not authenticated
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
                        <FirestoreChat
                            conversationId={activeConversation}
                            userId={user.uid}
                        />
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