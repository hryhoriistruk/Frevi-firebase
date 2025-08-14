import { useState, useEffect } from 'react';
import MessagingService from '@/services/MessagingService';
import MessageList from '@/components/services/MessageList';
import styles from '@/styles/Services.module.css';

export default function MessagingPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUserId] = useState('user1'); // В реальному додатку це має бути ID поточного користувача

    useEffect(() => {
        const unsubscribe = MessagingService.subscribeToMessages(
            currentUserId,
            (msgs) => setMessages(msgs)
        );
        return () => unsubscribe();
    }, [currentUserId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        await MessagingService.sendMessage(currentUserId, 'user2', newMessage);
        setNewMessage('');
    };

    return (
        <div className={styles.messagingContainer}>
            <h1 className={styles.title}>Messages</h1>
            <MessageList messages={messages} currentUserId={currentUserId} />
            <div className={styles.messageInput}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}