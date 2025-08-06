// pages/api/jobs/index.js
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    try {
        const jobsRef = collection(db, 'jobs');

        if (req.method === 'GET') {
            const snapshot = await getDocs(jobsRef);
            const jobs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(jobs);
        }
        else if (req.method === 'POST') {
            const newJob = req.body;
            const docRef = await addDoc(jobsRef, newJob);
            res.status(201).json({ id: docRef.id, ...newJob });
        }
        else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}