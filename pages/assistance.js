import { useState } from 'react';
import { sendHelpRequest } from '../lib/assistance';

export default function AssistancePage() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendHelpRequest('user123', message);
        setMessage('');
    };

    return (
        <div>
            <h1>Support</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your question..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}