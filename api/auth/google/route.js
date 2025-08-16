import { OAuth2Client } from 'google-auth-library';
import { signJWT } from '@/lib/auth';
import { connectDB } from '@/lib/db';

const API_BASE_URL = 'http://localhost:9191/api'; // Використовується для запитів через API Gateway
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request) {
    const { token } = await request.json();

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const db = await connectDB();

        // Перевірка, чи є користувач у базі
        let user = await db.collection('users').where('email', '==', payload.email).get();

        if (user.empty) {
            // Якщо немає — створюємо нового
            const newUser = {
                email: payload.email,
                name: payload.name,
                createdAt: new Date().toISOString(),
            };
            await db.collection('users').add(newUser);

            // Приклад використання API_BASE_URL для додаткового запиту (наприклад, створення профілю)
            await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
        }

        // Генеруємо JWT
        const jwtToken = signJWT({ email: payload.email });

        return new Response(JSON.stringify({ token: jwtToken }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Помилка аутентифікації' }), { status: 401 });
    }
}