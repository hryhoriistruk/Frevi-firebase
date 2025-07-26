import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function UserProfile() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (session) {
            fetch('/api/users/me')
                .then(res => res.json())
                .then(data => setUserData(data));
        }
    }, [session]);

    return (
        <div className="user-profile">
            {session ? (
                <>
                    <h2>Welcome, {userData?.name || session.user.name}</h2>
                    <p>Email: {session.user.email}</p>
                    <p>Role: {userData?.role || 'loading...'}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <>
                    <button onClick={() => signIn('google')}>Sign in with Google</button>
                    <button onClick={() => signIn('credentials')}>Email Login</button>
                </>
            )}
        </div>
    );
}