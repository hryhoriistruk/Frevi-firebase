import { UserService } from '../../lib/userService';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {

            const data = await UserService.getUser(req.query.userId);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}