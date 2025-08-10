'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase-client';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function FriendsList() {
    const [friends, setFriends] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'friends'),
            where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const friendsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFriends(friendsData);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Friends</h2>
            {friends.length === 0 ? (
                <p>No friends yet</p>
            ) : (
                <ul className="space-y-2">
                    {friends.map(friend => (
                        <li key={friend.id} className="p-2 border rounded">
                            {friend.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}