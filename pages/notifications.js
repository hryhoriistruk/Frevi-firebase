import { useState } from 'react';
import { FiSend, FiBell, FiAlertCircle } from 'react-icons/fi';
import styles from '@/styles/NotificationsPage.module.css';

export default function NotificationsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        if (!title.trim() || !body.trim()) {
            setError('Please fill in both title and message');
            return;
        }

        setIsSending(true);
        setError(null);

        try {
            const response = await fetch('/api/notification/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: 'device-token-123',
                    title,
                    body
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send notification');
            }

            setIsSuccess(true);
            setTitle('');
            setBody('');
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <FiBell className={styles.headerIcon} />
                <h1>Push Notifications</h1>
                <p>Send important updates to your users</p>
            </div>

            <div className={styles.card}>
                {error && (
                    <div className={styles.errorAlert}>
                        <FiAlertCircle />
                        <span>{error}</span>
                    </div>
                )}

                {isSuccess && (
                    <div className={styles.successAlert}>
                        Notification sent successfully!
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="title">Notification Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. New Feature Available"
                        className={styles.input}
                        maxLength={60}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="body">Message Content</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your notification message here..."
                        className={styles.textarea}
                        rows={4}
                        maxLength={240}
                    />
                </div>

                <div className={styles.preview}>
                    <h3>Preview</h3>
                    <div className={styles.notificationPreview}>
                        <div className={styles.notificationIcon}>
                            <FiBell />
                        </div>
                        <div className={styles.notificationContent}>
                            <div className={styles.notificationTitle}>
                                {title || "(No title)"}
                            </div>
                            <div className={styles.notificationBody}>
                                {body || "(No message)"}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSend}
                    disabled={isSending || !title.trim() || !body.trim()}
                    className={styles.sendButton}
                >
                    {isSending ? (
                        'Sending...'
                    ) : (
                        <>
                            <FiSend /> Send Notification
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}