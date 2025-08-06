import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../firebase/config';   // If your config is in firebase/config.js
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (!user?.uid) return;

        const q = query(
            collection(db, 'conversations'),
            where('participants', 'array-contains', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let count = 0;
            const convos = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.lastMessage && !data.lastMessage.readBy?.includes(user.uid)) {
                    count++;
                }
                convos.push({
                    id: doc.id,
                    ...data,
                    otherParticipants: data.participants.filter(uid => uid !== user.uid)
                });
            });

            setUnreadCount(count);
            setConversations(convos);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    const markAsRead = async (conversationId) => {
        try {
            const convoRef = doc(db, 'conversations', conversationId);
            await updateDoc(convoRef, {
                'lastMessage.readBy': [...(conversations.find(c => c.id === conversationId)?.lastMessage?.readBy || []), user.uid]
            });
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    return (
        <ChatContext.Provider value={{ unreadCount, conversations, markAsRead }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);