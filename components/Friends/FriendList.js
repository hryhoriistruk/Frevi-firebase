import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firebase/config";

const FriendList = ({ currentUserId, friends }) => {
    const removeFriend = async (friendId) => {
        try {
            const currentUserRef = doc(db, "users", currentUserId);
            const friendUserRef = doc(db, "users", friendId);

            await Promise.all([
                updateDoc(currentUserRef, {
                    friends: arrayRemove(friendId),
                }),
                updateDoc(friendUserRef, {
                    friends: arrayRemove(currentUserId),
                }),
            ]);
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    return (
        <div className="friend-list">
            <h3>Your Friends</h3>
            {friends.length === 0 ? (
                <p>No friends yet</p>
            ) : (
                friends.map((friendId) => (
                    <div key={friendId} className="friend-card">
                        <span>{friendId}</span>
                        <button onClick={() => removeFriend(friendId)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FriendList;