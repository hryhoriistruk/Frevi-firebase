import { db } from './firebase-config';
import {
    collection, addDoc, getDocs, query,
    where, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { getCurrentUser } from './auth';

export const createBooking = async (bookingData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const bookingRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        userId: user.uid,
        userName: user.displayName,
        userAvatar: user.photoURL,
        status: 'pending',
        createdAt: serverTimestamp()
    });
    return bookingRef.id;
};

export const getUserBookings = async (userId) => {
    const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};