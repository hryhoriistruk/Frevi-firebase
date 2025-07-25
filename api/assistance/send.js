import { db } from '../../../firebase/init';
import { addDoc, collection } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, message } = req.body;
        await addDoc(collection(db, 'helpRequests'), { userId, message });
        res.status(200).json({ success: true });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}