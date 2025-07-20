import { adminDb } from '@lib/firebase-admin';

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    try {
        if (!params?.id) {
            return { notFound: true };
        }

        const userRef = adminDb.collection('users').doc(params.id);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            return { notFound: true };
        }

        return {
            props: {
                user: userSnap.data()
            },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { notFound: true };
    }
}

export default function UserProfile({ user }) {
    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    return (
        <div className="user-profile">
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            {user.avatar && <img src={user.avatar} alt="Аватар" />}
        </div>
    );
}