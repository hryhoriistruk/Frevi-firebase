import { useState, useEffect } from 'react';
import HeadTag from '../../../components/HeadTag';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';

export default function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesRef = collection(db, 'services');
                const q = query(servicesRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const servicesData = [];
                querySnapshot.forEach((doc) => {
                    servicesData.push({ id: doc.id, ...doc.data() });
                });

                setServices(servicesData);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <HeadTag title="Loading Services | Frevi" />
                <Navbar />
                <main className="flex-grow bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading services...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <HeadTag title="Error | Frevi" />
                <Navbar />
                <main className="flex-grow bg-gray-50 flex items-center justify-center">
                    <div className="text-center p-6 max-w-md mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Services</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Services | Frevi" />
            <Navbar />

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Available Services</h1>
                        </div>

                        {services.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <p className="text-gray-600">No services available yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <Link href={`/jobs/s/${service.id}`} key={service.id}>
                                        <a className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h2 className="text-xl font-bold text-gray-800 truncate">{service.title}</h2>
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                                                </div>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-gray-800">{service.price}</span>
                                                    {service.duration && (
                                                        <span className="text-sm text-gray-500">{service.duration}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}