import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../../../Frevi-firebase/lib/firebase';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const userId = auth.currentUser?.uid;

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, req.body);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}