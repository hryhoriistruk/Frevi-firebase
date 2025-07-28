import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';


export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Using Firestore instead of SQL
        const userRef = db.collection('users').where('email', '==', session.user.email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get first matching document
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Return user data without sensitive fields
        const { password, ...safeUserData } = userData;

        res.status(200).json({
            id: userDoc.id,
            ...safeUserData
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const config = {
    api: {
        runtime: 'nodejs' // Додаємо Node.js runtime
    }
};