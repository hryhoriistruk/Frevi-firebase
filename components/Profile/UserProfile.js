import { sendFriendRequest } from "../Friends/AddFriend";

// Add this to the profile component:
{currentUserId !== user.id && (
    <button onClick={() => sendFriendRequest(currentUserId, user.id)}>
        Add Friend
    </button>
)}