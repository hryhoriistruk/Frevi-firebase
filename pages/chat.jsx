import ChatWindow from '../components/Chat/ChatWindow';
import Navbar from '../components/Navbar/Navbar';

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Messages</h1>
                <ChatWindow />
            </main>
        </div>
    );
}