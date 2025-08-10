'use client';
import { useEffect } from 'react';
import { getStorage } from 'firebase/storage';
import { app } from '@/lib/firebase/firebase-config';

export default function FirebaseWrapper({ children }) {
    useEffect(() => {
        const storage = getStorage(app);
        console.log('Firebase Storage initialized', storage);
    }, []);

    return children;
}