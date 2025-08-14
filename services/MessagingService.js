// services/MessagingService.js
import { db } from '../firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export default class MessagingService {
    static async sendMessage(senderId, receiverId, text) {
        await addDoc(collection(db, 'messages'), {
            senderId,
            receiverId,
            text,
            timestamp: new Date(),
        });
    }

    static subscribeToMessages(userId, callback) {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        });
    }
}