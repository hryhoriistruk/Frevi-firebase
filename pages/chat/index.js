import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';

export default function ChatIndex() {
    const router = useRouter();

    useEffect(() => {
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