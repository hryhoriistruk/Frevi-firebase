import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { adminConfig } from './firebase-config';

const app = getApps().length === 0 ? initializeApp({
    credential: cert(adminConfig.credential)
}) : getApps()[0];

export const db = getFirestore(app);