import { useFriends } from '@/context/FriendsContext';
import { FiUsers, FiUserPlus, FiBell } from 'react-icons/fi';
import AddFriend from '@/components/Friends/AddFriend';
import FriendList from '@/components/Friends/FriendList';
import FriendRequests from '@/components/Friends/FriendRequests';
import { useState } from 'react';

export default function FriendsPage() {
    const { friends, friendRequests } = useFriends();
    const [activeTab, setActiveTab] = useState('friends');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FiUsers className="text-3xl text-indigo-600" />
                        <h1 className="text-3xl font-bold text-gray-800">Friends Network</h1>
                    </div>
                    <p className="text-gray-600">Manage your connections and friend requests</p>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === 'friends' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('friends')}
                    >
                        <FiUsers />
                        My Friends ({friends.length})
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === 'requests' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        <FiBell />
                        Requests
                        {friendRequests.length > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {friendRequests.length}
                            </span>
                        )}
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === 'add' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('add')}
                    >
                        <FiUserPlus />
                        Add Friends
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {activeTab === 'friends' && (
                        <FriendList friends={friends} />
                    )}

                    {activeTab === 'requests' && (
                        <FriendRequests requests={friendRequests} />
                    )}

                    {activeTab === 'add' && (
                        <AddFriend />
                    )}
                </div>
            </div>
        </div>
    );
}