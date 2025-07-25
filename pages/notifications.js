import { useState } from 'react';

export default function NotificationsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSend = async () => {
        await fetch('/api/notification/send', {
            method: 'POST',
            body: JSON.stringify({ token: 'device-token-123', title, body }),
        });
    };

    return (
        <div>
            <h1>Send Notifications</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}