import { getSession } from 'next-auth/react';

// Тимчасове сховище повідомлень (в реальному проекті використовуйте базу даних)
let messages = [
    {
        id: 1,
        text: "Welcome to the messenger!",
        user: { name: "System" },
        timestamp: new Date().toISOString()
    }
];

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (req.method === 'GET') {
            // Повернення всіх повідомлень
            return res.status(200).json(messages);
        }

        if (req.method === 'POST') {
            // Перевірка автентифікації для відправки повідомлень
            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { text, userId } = req.body;

            if (!text || !text.trim()) {
                return res.status(400).json({ error: 'Message text is required' });
            }

            // Створення нового повідомлення
            const newMessage = {
                id: messages.length + 1,
                text: text.trim(),
                user: {
                    name: session.user.name || 'Unknown User',
                    email: session.user.email
                },
                userId: userId || session.user.email,
                timestamp: new Date().toISOString()
            };

            messages.push(newMessage);

            return res.status(201).json(newMessage);
        }

        // Метод не підтримується
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}