import { connectDB } from '@/lib/db';
import { verifyJWT } from '@/lib/auth';

export async function GET(request) {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Токен відсутній' }), { status: 401 });
    }

    try {
        const decoded = verifyJWT(token);
        const db = await connectDB();

        // Отримання даних користувача з бази
        const userSnapshot = await db.collection('users').where('email', '==', decoded.email).get();

        if (userSnapshot.empty) {
            return new Response(JSON.stringify({ error: 'Користувача не знайдено' }), { status: 404 });
        }

        const user = userSnapshot.docs[0].data();
        const { password, ...userData } = user; // Прибрати пароль з відповіді

        return new Response(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Невірний токен' }), { status: 401 });
    }
}