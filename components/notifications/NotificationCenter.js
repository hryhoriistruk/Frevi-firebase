import { useState, useEffect } from 'react';
import { getNotifications } from '../../services/notification';

export default function NotificationCenter({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications(userId);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    return (
        <div className="notification-center">
            <h2>Notifications</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                            <p>{notification.message}</p>
                            <small>{new Date(notification.timestamp).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}