import { useState } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../AuthContext';

export default function PostService() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Design',
        price: '',
        duration: '',
        description: '',
        deliverables: '',
        skillsRequired: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const docRef = await addDoc(collection(db, 'services'), {
                ...formData,
                authorId: currentUser.uid,
                authorName: currentUser.displayName,
                createdAt: serverTimestamp(),
                status: 'active',
                rating: 0,
                reviewsCount: 0
            });

            router.push(`/jobs/s/${docRef.id}`);
        } catch (err) {
            console.error('Error posting service:', err);
            setError('Failed to post service. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Post a Service</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields same as your post-job.js */}
                {/* ... */}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Posting...' : 'Post Service'}
                </button>
            </form>
        </div>
    );
}