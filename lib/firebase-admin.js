import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let firebaseAdmin;

// Check if Firebase Admin is already initialized
if (getApps().length === 0) {
    // Method 1: Using base64 (recommended)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64) {
        const serviceAccount = JSON.parse(
            Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString()
        );
        firebaseAdmin = initializeApp({
            credential: cert(serviceAccount)
        });
    }
    // Method 2: Separate environment variables
    else {
        firebaseAdmin = initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            })
        });
    }
} else {
    firebaseAdmin = getApps()[0];
}

export const adminDb = getFirestore(firebaseAdmin);