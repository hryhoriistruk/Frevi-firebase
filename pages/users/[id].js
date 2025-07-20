
import { doc, getDoc } from 'firebase/firestore';
import { db } from "@lib/firebase";

export async function getStaticPaths() {
    // Если вы знаете ID пользователей заранее, добавьте их здесь
    // Или оставьте пустым для динамической генерации
    return {
        paths: [],
        fallback: 'blocking' // Важно для динамических путей
    };
}

export async function getStaticProps({ params }) {
    try {
        const userRef = doc(db, 'users', params.id);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return { notFound: true };
        }

        return {
            props: {
                user: userSnap.data()
            },
            revalidate: 60 // ISR: страница будет перегенерироваться каждые 60 секунд
        };
    } catch (error) {
        return { notFound: true };
    }
}

export default function UserProfile({ user }) {
    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}