// Видаляємо імпорт Firebase
// import { adminDb } from '@lib/firebase-admin'; // <-- Цей рядок більше не потрібен

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

// Замінюємо Firebase на фейкові дані або REST API
export async function getStaticProps({ params }) {
    try {
        if (!params?.id) {
            return { notFound: true };
        }

        // Варіант 1: Фейкові дані (для тестування)
        const mockUsers = {
            '1': { name: 'Іван Петренко', email: 'ivan@example.com', avatar: '/avatars/1.jpg' },
            '2': { name: 'Марія Іванова', email: 'maria@example.com', avatar: '/avatars/2.jpg' }
        };

        // Варіант 2: Використання REST API (розкоментуйте, якщо є API)
        // const res = await fetch(`https://ваш-api.example.com/users/${params.id}`);
        // const user = await res.json();

        const user = mockUsers[params.id];

        if (!user) {
            return { notFound: true };
        }

        return {
            props: { user },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { notFound: true };
    }
}

// Компонент залишаємо без змін
export default function UserProfile({ user }) {
    if (!user) {
        return <div>Користувача не знайдено</div>;
    }

    return (
        <div className="user-profile">
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            {user.avatar && <img src={user.avatar} alt="Аватар" />}
        </div>
    );
}