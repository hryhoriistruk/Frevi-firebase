import { db } from '../../firebase/admin/init';

export default async function handler(req, res) {
    const snapshot = await db.collection('data').get();
    res.status(200).json(snapshot.docs.map(doc => doc.data()));
}