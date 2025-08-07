import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

const FriendsContext = createContext();

export function FriendsProvider({ children }) {
    const [friendsData, setFriendsData] = useState({
        friends: [],
        friendRequests: []
    });

    useEffect(() => {
        let unsubscribe;

        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    setFriendsData({
                        friends: doc.data().friends || [],
                        friendRequests: doc.data().friendRequests || []
                    });
                }
            });
        }

        return () => unsubscribe && unsubscribe();
    }, []);

    return (
        <FriendsContext.Provider value={friendsData}>
            {children}
        </FriendsContext.Provider>
    );
}

export function useFriends() {
    return useContext(FriendsContext);
}