import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../Frevi-firebase/lib/firebase";

export default async function handler(req, res) {
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}