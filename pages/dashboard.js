import { useEffect } from 'react';
import { analytics } from '@/firebase/client/init';
import { logEvent } from 'firebase/analytics';

export default function Dashboard() {
    useEffect(() => {
        // Only run analytics on client side
        if (typeof window !== 'undefined' && analytics) {
            logEvent(analytics, 'page_view', {
                page_title: 'Dashboard',
                page_path: '/dashboard'
            });
        }
    }, []);

    const handleClick = () => {
        if (analytics) {
            logEvent(analytics, 'button_click', {
                button_name: 'Dashboard Button',
                button_location: 'Dashboard Page'
            });
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Track Event</button>
        </div>
    );
}