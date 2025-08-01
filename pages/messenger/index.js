import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

export default function MessengerPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simulate authentication check
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                        <p>Loading messenger...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex h-[calc(100vh-6rem)]">
                <div className="w-64 border-r border-gray-200 p-4">
                    <h2 className="text-lg font-semibold mb-4">Conversations</h2>
                    {/* Chat list will go here */}
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500">Select a conversation to start chatting</p>
                </div>
            </div>
        </Layout>
    );
}