'use client';
import { useEffect } from 'react';
import { app } from '@/lib/firebase-client';

export default function FirebaseInitializer() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Promise.all([
                import('firebase/storage').then(({ getStorage }) => {
                    const storage = getStorage(app);
                    console.log('Firebase Storage initialized');
                    return storage;
                }),
                import('firebase/firestore').then(({ getFirestore }) => {
                    const db = getFirestore(app);
                    console.log('Firebase Firestore initialized');
                    return db;
                })
            ]).catch(console.error);
        }
    }, []);

    return null;
}