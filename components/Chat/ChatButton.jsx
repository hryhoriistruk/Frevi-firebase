import { useRouter } from 'next/router';
import { FiMessageSquare } from 'react-icons/fi';

export default function ChatButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/chat')}
            className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-4 py-2 rounded-full transition-colors"
        >
            <FiMessageSquare className="text-lg" />
            <span>Chat</span>
        </button>
    );
}