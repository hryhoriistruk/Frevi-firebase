import { hashPassword } from '@/lib/auth';
import { connectDB } from '@/lib/db';

export async function POST(request) {
    const { email, password, name } = await request.json();
    const db = await connectDB();

    // Перевірка, чи існує користувач
    const existingUser = await db.collection('users').where('email', '==', email).get();

    if (!existingUser.empty) {
        return new Response(JSON.stringify({ error: 'Користувач вже існує' }), { status: 400 });
    }

    // Хешування пароля (якщо потрібно)
    const hashedPassword = await hashPassword(password);

    // Збереження в базу (Firestore)
    const newUser = {
        email,
        password: hashedPassword,
        name,
        createdAt: new Date().toISOString(),
    };

    await db.collection('users').add(newUser);

    return new Response(JSON.stringify({ success: true }), { status: 201 });
}
