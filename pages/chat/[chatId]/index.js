import dynamic from 'next/dynamic';
import Layout from '../../../components/layout/Layout';

const ClientChat = dynamic(
    () => import('../../../components/Chat/ClientChat'),
    { ssr: false }
);

export default function ChatPage() {
    return (
        <Layout>
            <ClientChat />
        </Layout>
    );
}

// Disable SSR completely for this page
export const config = {
    unstable_runtimeJS: false
};