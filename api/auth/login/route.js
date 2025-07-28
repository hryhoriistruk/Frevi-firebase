import { signJWT } from '@/lib/auth';
import { connectDB } from '@/lib/db';

export async function POST(request) {
    const { email, password } = await request.json();
    const db = await connectDB();

    // Перевірка користувача в базі (Firebase/Firestore)
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
        return new Response(JSON.stringify({ error: 'Користувача не знайдено' }), { status: 401 });
    }

    const user = userSnapshot.docs[0].data();

    // Перевірка пароля (псевдокод, залежить від вашої логіки)
    if (user.password !== password) {
        return new Response(JSON.stringify({ error: 'Невірний пароль' }), { status: 401 });
    }

    // Генерація JWT токена
    const token = signJWT({ id: user.id, email: user.email });

    return new Response(JSON.stringify({ token }), { status: 200 });
}