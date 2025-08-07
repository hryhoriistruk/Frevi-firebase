import { useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import styles from '@/styles/FriendsPage.module.css';

const AddFriend = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const currentUserId = auth.currentUser?.uid;

    const handleSearch = async () => {
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("name", ">=", searchQuery),
            where("name", "<=", searchQuery + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
            if (doc.id !== currentUserId) {
                results.push({ id: doc.id, ...doc.data() });
            }
        });
        setSearchResults(results);
    };

    const sendFriendRequest = async (targetUserId) => {
        try {
            const targetUserRef = doc(db, "users", targetUserId);
            await updateDoc(targetUserRef, {
                friendRequests: arrayUnion(currentUserId),
            });
            alert("Friend request sent!");
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    return (
        <div className={styles.friendSearch}>
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
            <button
                onClick={handleSearch}
                className={styles.actionButton}
            >
                Search
            </button>

            <div className={styles.searchResults}>
                {searchResults.map((user) => (
                    <div key={user.id} className={styles.userCard}>
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.name}
                            className={styles.userAvatar}
                        />
                        <span className={styles.userName}>{user.name}</span>
                        <button
                            onClick={() => sendFriendRequest(user.id)}
                            className={styles.actionButton}
                        >
                            Add Friend
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddFriend;