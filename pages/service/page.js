import ServiceCard from '@/components/services/ServiceCard';
import SearchFilters from '@/components/services/SearchFilters';

async function getServices(searchParams) {
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?${params}`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
}

export default async function ServicesPage({ searchParams }) {
    const services = await getServices(searchParams);

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Available Services</h1>
                <SearchFilters />
            </div>

            {services.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No services found matching your criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}