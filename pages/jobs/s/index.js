import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import ServiceCard from '../../../components/Service/ServiceCard';
import Layout from '../../../components/layout/Layout';

export default function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const servicesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <Layout title="Services">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Available Services</h1>

                {loading ? (
                    <div>Loading services...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}