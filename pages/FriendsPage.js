'use client';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import "@/styles/FriendsPage.module.css";

const FriendsPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initialize = async () => {
                try {
                    const { auth } = await import('@/lib/firebase-client');
                    const { getAuth } = await import('firebase/auth');
                    const { doc, onSnapshot } = await import('firebase/firestore');
                    const { db } = await import('@/lib/firebase-client');

                    const authInstance = getAuth(auth);
                    const unsubscribe = authInstance.onAuthStateChanged(async (user) => {
                        if (user) {
                            const userRef = doc(db, "users", user.uid);
                            const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
                                setCurrentUser({ id: user.uid, ...doc.data() });
                                setIsLoading(false);
                            });
                            return () => unsubscribeSnapshot();
                        } else {
                            setIsLoading(false);
                            router.push('/login');
                        }
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Firebase initialization error:", error);
                    setIsLoading(false);
                }
            };

            initialize();
        }
    }, [router]);

    if (isLoading) return <div>Loading...</div>;

    // Динамічний імпорт компонентів
    const AddFriend = dynamic(() => import("../components/Friends/AddFriend"), { ssr: false });
    const FriendRequests = dynamic(() => import("../components/Friends/FriendRequests"), { ssr: false });
    const FriendList = dynamic(() => import("../components/Friends/FriendList"), { ssr: false });

    return (
        <div className="friends-page">
            <h1>Friends Network</h1>
            <div className="friends-container">
                <AddFriend currentUserId={currentUser?.id} />
                <FriendRequests
                    currentUserId={currentUser?.id}
                    requests={currentUser?.friendRequests || []}
                />
                <FriendList
                    currentUserId={currentUser?.id}
                    friends={currentUser?.friends || []}
                />
            </div>
        </div>
    );
};

export default FriendsPage;