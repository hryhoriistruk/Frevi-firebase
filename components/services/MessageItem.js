// components/services/MessageItem.js
import styles from '../../styles/Services.module.css';

export default function MessageItem({ message, isCurrentUser }) {
    return (
        <div className={`${styles.messageItem} ${isCurrentUser ? styles.currentUser : styles.otherUser}`}>
            <div className={styles.messageContent}>
                <p>{message.text}</p>
                <span className={styles.messageTime}>
          {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
        </span>
            </div>
        </div>
    );
}