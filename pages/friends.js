import { useFriends } from '@/context/FriendsContext';
import AddFriend from '@/components/Friends/AddFriend';
import FriendList from '@/components/Friends/FriendList';
import FriendRequests from '@/components/Friends/FriendRequests';

export default function FriendsPage() {
    const { friends, friendRequests } = useFriends();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Friends Network</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <AddFriend />
                    <FriendRequests requests={friendRequests} />
                </div>
                <FriendList friends={friends} />
            </div>
        </div>
    );
}