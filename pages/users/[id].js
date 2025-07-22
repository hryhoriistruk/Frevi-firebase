import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../Frevi-firebase/lib/firebase'; // Використовуйте клієнтський Firebase
import { doc, getDoc } from 'firebase/firestore';

export default function UserProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                setLoading(true);
                const userRef = doc(db, 'users', id);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUser(userSnap.data());
                } else {
                    setError('Пользователь не найден');
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Ошибка загрузки пользователя');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="loader">Загрузка...</div>
        </div>;
    }

    if (error) {
        return <div className="error-message text-center text-red-500">
            {error}
        </div>;
    }

    if (!user) {
        return <div className="text-center">Пользователь не найден</div>;
    }

    return (
        <div className="user-profile max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{user.name || 'Безымянный пользователь'}</h1>
            <p className="text-lg mb-2">Email: {user.email || 'Не указан'}</p>
            {user.avatar && (
                <img
                    src={user.avatar}
                    alt="Аватар"
                    className="w-32 h-32 rounded-full object-cover mt-4"
                />
            )}
            {user.bio && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">О себе:</h2>
                    <p className="text-gray-700">{user.bio}</p>
                </div>
            )}
        </div>
    );
}