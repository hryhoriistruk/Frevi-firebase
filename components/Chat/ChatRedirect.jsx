import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ChatRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home or 404 page
        router.replace('/');
    }, []);

    return (
        <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
            <p>Redirecting...</p>
        </div>
    );
}