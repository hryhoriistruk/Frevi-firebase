// lib/firebase/services.js
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './init';

let servicesInitialized = false;

export async function getAllServiceIds() {
    try {
        const servicesCollection = collection(db, 'services');
        const snapshot = await getDocs(servicesCollection);
        return snapshot.docs.map(doc => doc.id);
    } catch (error) {
        console.error('Error fetching service IDs:', error);
        throw error;
    }
}

export async function getServiceById(id) {
    try {
        const serviceRef = doc(db, 'services', id);
        const snapshot = await getDoc(serviceRef);

        if (!snapshot.exists()) {
            return null;
        }

        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        };
    } catch (error) {
        console.error(`Error fetching service ${id}:`, error);
        throw error;
    }
}