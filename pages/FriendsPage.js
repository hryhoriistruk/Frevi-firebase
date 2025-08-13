import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import AddFriend from "../components/Friends/AddFriend";
import FriendRequests from "../components/Friends/FriendRequests";
import FriendList from "../components/Friends/FriendList";
import styles from "@/styles/2FriendsPage.module.css";
import { FiUsers, FiUserPlus, FiBell } from "react-icons/fi";

const FriendsPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("friends");

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

    if (!currentUser) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading your friends network...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <FiUsers className={styles.titleIcon} />
                    Friends Network
                </h1>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "friends" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("friends")}
                    >
                        My Friends
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "requests" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        <FiBell className={styles.tabIcon} />
                        Requests
                        {currentUser.friendRequests?.length > 0 && (
                            <span className={styles.badge}>
                                {currentUser.friendRequests.length}
                            </span>
                        )}
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "add" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("add")}
                    >
                        <FiUserPlus className={styles.tabIcon} />
                        Add Friends
                    </button>
                </div>
            </header>

            <main className={styles.mainContent}>
                {activeTab === "friends" && (
                    <FriendList
                        currentUserId={currentUser.id}
                        friends={currentUser.friends || []}
                    />
                )}

                {activeTab === "requests" && (
                    <FriendRequests
                        currentUserId={currentUser.id}
                        requests={currentUser.friendRequests || []}
                    />
                )}

                {activeTab === "add" && (
                    <AddFriend currentUserId={currentUser.id} />
                )}
            </main>
        </div>
    );
};

export default FriendsPage;