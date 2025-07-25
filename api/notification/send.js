import { adminMessaging } from '../../../firebase/init';

export default async function handler(req, res) {
    const { token, title, body } = req.body;
    await adminMessaging.send({ token, notification: { title, body } });
    res.status(200).json({ success: true });
}