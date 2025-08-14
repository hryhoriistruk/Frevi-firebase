import { useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState(
        Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            firstName: `User${i + 1}`,
            lastName: `Last${i + 1}`,
        }))
    );

    const [newUser, setNewUser] = useState({ firstName: "", lastName: "" });

    const handleAddUser = () => {
        if (!newUser.firstName.trim() || !newUser.lastName.trim()) return;
        setUsers([...users, { id: Date.now(), ...newUser }]);
        setNewUser({ firstName: "", lastName: "" });
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>

            {/* Add user form */}
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="border px-3 py-1 rounded w-1/3"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="border px-3 py-1 rounded w-1/3"
                />
                <button
                    onClick={handleAddUser}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Add User
                </button>
            </div>

            {/* Users list */}
            <ul className="space-y-2 border p-2 max-h-[500px] overflow-y-auto">
                {users.map(user => (
                    <li key={user.id} className="flex justify-between items-center px-2 py-1 border rounded hover:bg-gray-50">
                        <span>{user.id}. {user.firstName} {user.lastName}</span>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
