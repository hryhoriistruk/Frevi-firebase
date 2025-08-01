import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(null);

    return (
        <Layout>
            <div className="flex h-[calc(100vh-6rem)]">
                <ChatList onSelectChat={setActiveChat} />
                <ChatWindow chat={activeChat} />
            </div>
        </Layout>
    );
}