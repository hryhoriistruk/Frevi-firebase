import { useEffect } from 'react';
import { analytics } from '../firebase/client/init';
import { logEvent } from 'firebase/analytics';

export default function Dashboard() {
    useEffect(() => {
        // Only run analytics on client side
        if (analytics) {
            logEvent(analytics, 'page_view', { page_title: 'Dashboard' });
        }
    }, []);

    const handleClick = () => {
        if (analytics) {
            logEvent(analytics, 'button_click', { button_name: 'Dashboard Button' });
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Track Event</button>
        </div>
    );
}