import { useRouter } from 'next/router';
import { FiMessageSquare } from 'react-icons/fi';

export default function ChatButton() {
    const router = useRouter();

    const handleClick = () => {
        console.log('ChatButton clicked!');
        console.log('Current pathname:', router.pathname);
        console.log('Navigating to /chat...');

        router.push('/chat').then(() => {
            console.log('Navigation to /chat completed');
        }).catch((error) => {
            console.error('Navigation failed:', error);
        });
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-4 py-2 rounded-full transition-colors"
        >
            <FiMessageSquare className="text-lg" />
            <span>Chat</span>
        </button>
    );
}