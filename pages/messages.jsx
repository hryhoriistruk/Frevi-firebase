import { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import styles from '@/styles/MessagesPage.module.css';

export default function MessagesPage() {
    const [messages, setMessages] = useState([
        {id: 1, text: "Привіт!", sender: "user", timestamp: new Date(Date.now() - 3600000)},
        {id: 2, text: "Як справи? Що нового?", sender: "other", timestamp: new Date(Date.now() - 1800000)},
        {id: 3, text: "Плануєш щось на вихідні?", sender: "other", timestamp: new Date(Date.now() - 600000)},
    ]);

    const [newMessage, setNewMessage] = useState("");
    const [activeChat, setActiveChat] = useState("john_doe");
    const messagesEndRef = useRef(null);

    const chats = [
        { id: "john_doe", name: "John Doe", avatar: "JD", lastMessage: "Плануєш щось на вихідні?", unread: 2, online: true },
        { id: "jane_smith", name: "Jane Smith", avatar: "JS", lastMessage: "Дякую за допомогу!", unread: 0, online: false },
        { id: "team_group", name: "Team Group", avatar: "TG", lastMessage: "Meeting at 3pm", unread: 5, online: true }
    ];

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const newMsg = {
            id: Date.now(),
            text: newMessage,
            sender: "user",
            timestamp: new Date()
        };
        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.messengerContainer}>
            {/* Сайдбар зі списком чатів */}
            <div className={styles.chatSidebar}>
                <div className={styles.sidebarHeader}>
                    Повідомлення
                </div>
                <div className={styles.chatList}>
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`${styles.chatItem} ${activeChat === chat.id ? styles.active : ''}`}
                            onClick={() => setActiveChat(chat.id)}
                        >
                            <div className={styles.chatAvatar}>
                                {chat.avatar}
                            </div>
                            <div className={styles.chatInfo}>
                                <div className={styles.chatName}>{chat.name}</div>
                                <div className={styles.chatPreview}>{chat.lastMessage}</div>
                            </div>
                            {chat.unread > 0 && (
                                <div className={styles.unreadBadge}>{chat.unread}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Основна область чату */}
            <div className={styles.chatArea}>
                {/* Заголовок чату */}
                <div className={styles.chatHeader}>
                    <div className={styles.partnerAvatar}>
                        {chats.find(c => c.id === activeChat)?.avatar}
                    </div>
                    <div style={{flex: 1}}>
                        <div className={styles.partnerName}>
                            {chats.find(c => c.id === activeChat)?.name}
                        </div>
                        <div className={styles.status}>
                            {chats.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                    <button className={styles.moreButton}>
                        <FiMoreVertical />
                    </button>
                </div>

                {/* Повідомлення */}
                <div className={styles.messagesContainer}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${styles[msg.sender]}`}
                        >
                            {msg.text}
                            <div className={styles.messageTime}>
                                {formatTime(msg.timestamp)}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Ввід повідомлення */}
                <div className={styles.messageInputContainer}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Написати повідомлення..."
                        className={styles.messageInput}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className={styles.sendButton}
                        disabled={!newMessage.trim()}
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
}