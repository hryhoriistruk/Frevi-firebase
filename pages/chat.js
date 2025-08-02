import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

export default function ChatHandler() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if someone lands on /chat directly
        router.replace('/');
    }, []);

    return (
        <Layout>
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
                <p>Redirecting to homepage...</p>
            </div>
        </Layout>
    );
}

// Disable SSR completely for this page
export const config = {
    unstable_runtimeJS: false
};