import { adminAuth } from '../../../firebase/init';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await adminAuth.listUsers();
        res.status(200).json(users);
    }
}