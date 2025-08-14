import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

export default function ServiceDetail({ serviceId }) {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchService = async () => {
            try {
                const docRef = doc(db, 'services', serviceId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setService({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Service not found');
                }
            } catch (err) {
                console.error('Error fetching service:', err);
                setError('Failed to load service');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!service) return <div>Service not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link href="/jobs/s">
                <a className="text-blue-600 hover:underline mb-4 inline-block">← Back to services</a>
            </Link>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold">{service.title}</h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {service.category}
          </span>
                </div>

                <p className="text-gray-600 mt-2">By {service.authorName}</p>
                <p className="text-xl font-bold mt-4">{service.price}</p>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="mt-2 whitespace-pre-line">{service.description}</p>
                </div>

                {/* Add more sections for deliverables, skills, etc. */}
            </div>
        </div>
    );
}