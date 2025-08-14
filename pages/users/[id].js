import React, { useState } from "react";

export default function UserProfile() {
    // Default placeholder avatar
    const defaultAvatar = "https://via.placeholder.com/150?text=User";

    // Mock user with default values
    const mockUser = {
        id: "0",
        name: "Name Username",
        email: "example@example.com",
        phone: "",
        title: "Freelancer / Service Provider",
        location: "Not specified",
        avatar: defaultAvatar,
        isOnline: false,
        isVerified: false,
        bio: "Describe yourself and your services here.",
        joinDate: new Date().toISOString(),
        socialLinks: {},
        skills: [],
        stats: {
            projects: 0,
            followers: 0,
            following: 0,
            contributions: 0
        },
        services: [
            {
                id: "1",
                name: "Example Service",
                description: "Describe your service here",
                price: "Negotiable"
            }
        ],
        projects: [],
        activity: []
    };

    const [user, setUser] = useState(mockUser);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="max-w-5xl mx-auto py-10">
            <div className="bg-white shadow rounded-lg">
                {/* Header */}
                <div className="flex items-center p-6">
                    <img
                        src={user.avatar || defaultAvatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="ml-6">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-600">{user.title}</p>
                        <p className="text-gray-500">{user.location}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "overview" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("services")}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "services" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => setActiveTab("activity")}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "activity" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                        >
                            Activity
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === "overview" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">About</h2>
                            <p className="text-gray-600">{user.bio}</p>
                        </div>
                    )}

                    {activeTab === "services" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">My Services</h2>
                            {user.services?.length > 0 ? (
                                <div className="space-y-4">
                                    {user.services.map((service) => (
                                        <div key={service.id} className="border p-4 rounded-lg shadow-sm">
                                            <h3 className="font-medium text-lg">{service.name}</h3>
                                            <p className="text-gray-600">{service.description}</p>
                                            <p className="text-gray-800 font-semibold mt-2">Price: {service.price}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No services listed yet.</p>
                            )}
                        </div>
                    )}

                    {activeTab === "activity" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                            {user.activity?.length > 0 ? (
                                <div className="space-y-4">
                                    {user.activity.map((item, index) => (
                                        <div key={index} className="border-l-2 border-indigo-500 pl-4 py-2">
                                            <div className="text-sm text-gray-500">{new Date(item.date).toLocaleString()}</div>
                                            <p className="text-gray-800">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No recent activity.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
