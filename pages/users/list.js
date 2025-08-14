import { useState } from "react";

export default function UsersPage() {
    const [users] = useState(
        Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            username: `username${i + 1}`,
        }))
    );

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>

            <ul className="space-y-2 border p-2 max-h-[500px] overflow-y-auto">
                {users.map(user => (
                    <li key={user.id} className="flex justify-between items-center px-2 py-1 border rounded hover:bg-gray-50">
                        <span>{user.id}. {user.name} ({user.username})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
