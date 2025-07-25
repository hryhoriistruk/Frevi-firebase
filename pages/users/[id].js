import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UserProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('User not found');
            }
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">User not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center space-x-6">
                    {user.avatar && (
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {user.name || 'Unknown User'}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Email: {user.email}
                        </p>
                    </div>
                </div>

                {user.bio && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-700">{user.bio}</p>
                    </div>
                )}
            </div>
        </div>
    );
}