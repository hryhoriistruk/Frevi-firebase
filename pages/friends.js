'use client'

import { useState, useEffect } from 'react';

export default function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [newFriendEmail, setNewFriendEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock data for demonstration
    useEffect(() => {
        // Simulate loading friends data
        setFriends([
            { id: 1, name: 'John Doe', email: 'john@example.com', status: 'online' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'offline' },
            { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'online' },
        ]);

        setFriendRequests([
            { id: 1, name: 'Alice Brown', email: 'alice@example.com', message: 'Hi! Let\'s be friends!' },
            { id: 2, name: 'Bob Wilson', email: 'bob@example.com', message: 'Found you through mutual friends' },
        ]);
    }, []);

    const handleAddFriend = async (e) => {
        e.preventDefault();
        if (!newFriendEmail.trim()) return;

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Add to friend requests (in real app, this would be sent to the other user)
            const newRequest = {
                id: Date.now(),
                email: newFriendEmail,
                status: 'pending'
            };

            alert(`Friend request sent to ${newFriendEmail}`);
            setNewFriendEmail('');
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert('Failed to send friend request');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = (requestId) => {
        const request = friendRequests.find(req => req.id === requestId);
        if (request) {
            // Move from requests to friends
            setFriends(prev => [...prev, {
                id: Date.now(),
                name: request.name,
                email: request.email,
                status: 'online'
            }]);
            setFriendRequests(prev => prev.filter(req => req.id !== requestId));
        }
    };

    const handleDeclineRequest = (requestId) => {
        setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    };

    const handleRemoveFriend = (friendId) => {
        if (confirm('Are you sure you want to remove this friend?')) {
            setFriends(prev => prev.filter(friend => friend.id !== friendId));
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Friends Network</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Add Friend Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Friend</h2>
                        <form onSubmit={handleAddFriend} className="space-y-4">
                            <div>
                                <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-600 mb-2">
                                    Friend's Email
                                </label>
                                <input
                                    id="friendEmail"
                                    type="email"
                                    value={newFriendEmail}
                                    onChange={(e) => setNewFriendEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                            >
                                {loading ? 'Sending...' : 'Send Friend Request'}
                            </button>
                        </form>
                    </div>

                    {/* Friend Requests Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">
                            Friend Requests ({friendRequests.length})
                        </h2>
                        {friendRequests.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No pending friend requests</p>
                        ) : (
                            <div className="space-y-4">
                                {friendRequests.map((request) => (
                                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-800">{request.name}</h3>
                                                <p className="text-sm text-gray-600">{request.email}</p>
                                                {request.message && (
                                                    <p className="text-sm text-gray-500 mt-1 italic">"{request.message}"</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <button
                                                onClick={() => handleAcceptRequest(request.id)}
                                                className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDeclineRequest(request.id)}
                                                className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Friends List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        My Friends ({friends.length})
                    </h2>
                    {friends.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No friends added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {friends.map((friend) => (
                                <div key={friend.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {friend.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800">{friend.name}</h3>
                                                <p className="text-sm text-gray-600">{friend.email}</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}></div>
                                                    <span className="text-xs text-gray-500 capitalize">{friend.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors"
                                                onClick={() => alert(`Starting chat with ${friend.name}`)}
                                            >
                                                Message
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFriend(friend.id)}
                                                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}