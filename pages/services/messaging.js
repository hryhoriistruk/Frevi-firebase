import { useState, useEffect, useRef } from 'react';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import styles from '@/styles/MessagesPage.module.css';

export default function Messaging() {
    const chatsData = [
        { id: "john", name: "John Doe", avatar: "JD", online: true },
        { id: "jane", name: "Jane Smith", avatar: "JS", online: false },
        { id: "mike", name: "Mike Johnson", avatar: "MJ", online: true }
    ];

    const [activeChat, setActiveChat] = useState(chatsData[0].id);
    const [drafts, setDrafts] = useState({
        john: "",
        jane: "",
        mike: ""
    });

    const [messages, setMessages] = useState({
        john: [{ id: 1, text: "Привіт, як справи?", sender: "other", timestamp: new Date(Date.now() - 3600000) }],
        jane: [{ id: 1, text: "Про зустріч завтра...", sender: "other", timestamp: new Date(Date.now() - 1800000) }],
        mike: [{ id: 1, text: "Документи готові", sender: "other", timestamp: new Date(Date.now() - 600000) }]
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    const handleSend = () => {
        const text = drafts[activeChat].trim();
        if (!text) return;

        const newMsg = {
            id: Date.now(),
            text,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], newMsg]
        }));

        setDrafts(prev => ({ ...prev, [activeChat]: "" }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.messengerContainer}>
            {/* Sidebar */}
            <div className={styles.chatSidebar}>
                <div className={styles.sidebarHeader}>Чати</div>
                <div className={styles.chatList}>
                    {chatsData.map(chat => (
                        <div
                            key={chat.id}
                            className={`${styles.chatItem} ${activeChat === chat.id ? styles.active : ''}`}
                            onClick={() => setActiveChat(chat.id)}
                        >
                            <div className={styles.chatAvatar}>{chat.avatar}</div>
                            <div className={styles.chatInfo}>
                                <div className={styles.chatName}>{chat.name}</div>
                                <div className={styles.chatPreview}>
                                    {messages[chat.id]?.slice(-1)[0]?.text || ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            <div className={styles.chatArea}>
                {/* Header */}
                <div className={styles.chatHeader}>
                    <div className={styles.partnerAvatar}>
                        {chatsData.find(c => c.id === activeChat)?.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className={styles.partnerName}>
                            {chatsData.find(c => c.id === activeChat)?.name}
                        </div>
                        <div className={styles.status}>
                            {chatsData.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                    <button className={styles.moreButton}><FiMoreVertical /></button>
                </div>

                {/* Messages */}
                <div className={styles.messagesContainer}>
                    {messages[activeChat]?.map(msg => (
                        <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                            {msg.text}
                            <div className={styles.messageTime}>{formatTime(msg.timestamp)}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={styles.messageInputContainer}>
                    <textarea
                        value={drafts[activeChat]}
                        onChange={(e) => setDrafts(prev => ({ ...prev, [activeChat]: e.target.value }))}
                        placeholder="Написати повідомлення..."
                        className={styles.messageInput}
                        onKeyDown={handleKeyPress}
                        rows={2}
                    />
                    <button
                        onClick={handleSend}
                        className={styles.sendButton}
                        disabled={!drafts[activeChat].trim()}
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
}
