import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/context/AuthContext';
import Layout from '../../components/layout/Layout';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';

export default function MessengerPage() {
    const { user, loading } = useAuth();
    const [activeChat, setActiveChat] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    // Set client flag on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (isClient && !loading && !user) {
            router.push('/auth/login');
        }
    }, [isClient, loading, user, router]);

    // Render loading state during SSR or initial load
    if (!isClient || loading) {
        return (
            <Layout>
                <div className="flex h-[calc(100vh-6rem)]">
                    <div className="w-64 border-r border-gray-200 p-4">
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center">
                            <p className="mb-4">Loading messenger...</p>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Render main content
    return (
        <Layout>
            <div className="flex h-[calc(100vh-6rem)]">
                <ChatList onSelectChat={setActiveChat} />
                <ChatWindow chat={activeChat} />
            </div>
        </Layout>
    );
}