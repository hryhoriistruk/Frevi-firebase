import { doc, getDoc } from 'firebase/firestore';
import { db } from "@lib/firebase";

export async function getStaticProps(context) {
    const { id } = context.params;

    try {
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return { notFound: true };
        }

        return {
            props: {
                user: userSnap.data()
            },
            revalidate: 60 // ISR: регенерація кожні 60 секунд
        };
    } catch (error) {
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    // Якщо знаєте ID заздалегідь, додайте їх тут
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export default function UserProfile({ user }) {
    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}