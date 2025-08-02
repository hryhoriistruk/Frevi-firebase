import { useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/Layout'
import ChatList from '@/components/Chat/ChatList'

// 1. Dynamic import with SSR disabled for client-side only components
const ChatWindow = dynamic(
    () => import('@/components/Chat/ChatWindow').then(mod => mod.default),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-full">Loading chat...</div>
    }
)

// 2. Simple inline placeholder component
const ChatPlaceholder = () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-6">
            <h3 className="text-lg font-medium text-gray-900">No chat selected</h3>
            <p className="mt-1 text-sm text-gray-500">
                Select a conversation to begin messaging
            </p>
        </div>
    </div>
)

// 3. Main chat page component
export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(null)

    return (
        <Layout>
            <div className="flex h-[calc(100vh-6rem)]">
                {/* Chat list sidebar */}
                <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200">
                    <ChatList onSelectChat={setActiveChat} />
                </div>

                {/* Chat window area */}
                <div className="hidden md:flex md:w-2/3 lg:w-3/4">
                    {activeChat ? (
                        <ChatWindow chat={activeChat} key={activeChat.id} />
                    ) : (
                        <ChatPlaceholder />
                    )}
                </div>
            </div>
        </Layout>
    )
}

// 4. Add this if you need initial data loading
export async function getServerSideProps() {
    return {
        props: {} // Add any initial props here if needed
    }
}