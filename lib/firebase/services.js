// lib/firebase/services.js
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// Update this import path to match your actual Firebase config file
// Common paths are:
// import { db } from './firebase';
// import { db } from '../firebase';
// import { db } from '@/lib/firebase';
// import { db } from '@/firebase/config';
import { db } from '@/lib/firebase'; // Adjust this path to your actual config file

export async function getAllServices() {
    try {
        const servicesRef = collection(db, 'services');
        const snapshot = await getDocs(servicesRef);

        const services = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            services.push({
                id: doc.id,
                ...data,
                // Ensure all data is serializable (no Date objects, etc.)
                createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
                updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
            });
        });

        return services;
    } catch (error) {
        console.error('Error fetching services:', error);
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
            // Ensure all data is serializable
            createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        throw error;
    }
}