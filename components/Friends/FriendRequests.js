import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import styles from '@/styles/FriendsPage.module.css';

const FriendRequests = ({ requests }) => {
    const currentUserId = auth.currentUser?.uid;

    const acceptRequest = async (senderUserId) => {
        try {
            const currentUserRef = doc(db, "users", currentUserId);
            const senderUserRef = doc(db, "users", senderUserId);

            await Promise.all([
                updateDoc(currentUserRef, {
                    friends: arrayUnion(senderUserId),
                    friendRequests: arrayRemove(senderUserId),
                }),
                updateDoc(senderUserRef, {
                    friends: arrayUnion(currentUserId),
                }),
            ]);
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const rejectRequest = async (senderUserId) => {
        try {
            const currentUserRef = doc(db, "users", currentUserId);
            await updateDoc(currentUserRef, {
                friendRequests: arrayRemove(senderUserId),
            });
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    return (
        <div className={styles.friendRequests}>
            <h3>Friend Requests</h3>
            {requests.length === 0 ? (
                <p>No pending requests</p>
            ) : (
                requests.map((userId) => (
                    <div key={userId} className={styles.requestCard}>
                        <span>{userId}</span>
                        <div className={styles.requestActions}>
                            <button
                                onClick={() => acceptRequest(userId)}
                                className={styles.actionButton}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => rejectRequest(userId)}
                                className={styles.actionButton}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default FriendRequests;