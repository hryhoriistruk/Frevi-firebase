// lib/firebase/auth.js
import { getAuth } from 'firebase/auth';
import { auth } from './firebase-config';

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};