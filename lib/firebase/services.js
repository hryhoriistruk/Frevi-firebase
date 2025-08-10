import { db } from './firebase-config';
import {
    collection, addDoc, getDocs, getDoc, doc,
    updateDoc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { getCurrentUser } from './auth';

export const addService = async (serviceData) => {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const serviceRef = await addDoc(collection(db, 'services'), {
        ...serviceData,
        providerId: user.uid,
        providerName: user.displayName,
        providerAvatar: user.photoURL,
        createdAt: serverTimestamp(),
        ratingAverage: 0,
        ratingCount: 0,
        status: 'active'
    });
    return serviceRef.id;
};

export const getServices = async (filters = {}) => {
    let q = collection(db, 'services');

    if (filters.category) {
        q = query(q, where('category', '==', filters.category));
    }
    if (filters.userId) {
        q = query(q, where('providerId', '==', filters.userId));
    }

    q = query(q, where('status', '==', 'active'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getServiceById = async (id) => {
    const docSnap = await getDoc(doc(db, 'services', id));
    if (!docSnap.exists()) throw new Error('Service not found');
    return { id: docSnap.id, ...docSnap.data() };
};