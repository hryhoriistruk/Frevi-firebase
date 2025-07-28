import { OAuth2Client } from 'google-auth-library';
import { signJWT } from '@/lib/auth';
import { connectDB } from '@/lib/db';

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

        // Перевірка чи є користувач у базі
        let user = await db.collection('users').where('email', '==', payload.email).get();

        if (user.empty) {
            // Якщо немає — створюємо нового
            const newUser = {
                email: payload.email,
                name: payload.name,
                createdAt: new Date().toISOString(),
            };
            await db.collection('users').add(newUser);
        }

        // Генеруємо JWT
        const jwtToken = signJWT({ email: payload.email });

        return new Response(JSON.stringify({ token: jwtToken }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Помилка аутентифікації' }), { status: 401 });
    }
}