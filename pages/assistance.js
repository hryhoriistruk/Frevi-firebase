import { useState } from 'react';
import { sendHelpRequest } from '../lib/assistance';
import { FiSend, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';
import Head from 'next/head';
import styles from '../styles/Assistance.module.css';

export default function AssistancePage() {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        try {
            await sendHelpRequest('user123', message);
            setMessage('');
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (error) {
            console.error('Error sending help request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Support | Frevi</title>
                <meta name="description" content="Get help from our support team" />
            </Head>

            <div className={styles.card}>
                <div className={styles.header}>
                    <FiHelpCircle className={styles.headerIcon} />
                    <h1>Contact Support</h1>
                    <p>We're here to help you with any questions or issues</p>
                </div>

                {isSuccess ? (
                    <div className={styles.successMessage}>
                        <FiCheckCircle />
                        <span>Your message has been sent successfully!</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Describe your issue or question..."
                                rows="5"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting || !message.trim()}
                        >
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    <FiSend /> Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className={styles.contactInfo}>
                    <h3>Other ways to contact us:</h3>
                    <ul>
                        <li>Email: support@frevi.com</li>
                        <li>Phone: +1 (800) 123-4567</li>
                        <li>Live chat: Available 24/7</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}