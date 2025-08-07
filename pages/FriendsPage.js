import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import AddFriend from "../components/Friends/AddFriend";
import FriendRequests from "../components/Friends/FriendRequests";
import FriendList from "../components/Friends/FriendList";
import "@/styles/FriendsPage.module.css";

const FriendsPage = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const unsubscribeSnapshot = onSnapshot(userRef, (doc) => {
                    setCurrentUser({ id: user.uid, ...doc.data() });
                });
                return () => unsubscribeSnapshot();
            }
        });

        return () => unsubscribe();
    }, []);

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="friends-page">
            <h1>Friends Network</h1>
            <div className="friends-container">
                <AddFriend currentUserId={currentUser.id} />
                <FriendRequests
                    currentUserId={currentUser.id}
                    requests={currentUser.friendRequests || []}
                />
                <FriendList
                    currentUserId={currentUser.id}
                    friends={currentUser.friends || []}
                />
            </div>
        </div>
    );
};

export default FriendsPage;