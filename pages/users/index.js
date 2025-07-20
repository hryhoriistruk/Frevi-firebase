import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(setUsers);
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}