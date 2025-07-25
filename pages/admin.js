import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/admin/users')
            .then((res) => res.json())
            .then(setUsers);
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.uid}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
}