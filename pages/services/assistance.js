import { useState } from 'react';
import Head from 'next/head';

// Service search function
export async function searchServices({ query, minPrice, maxPrice, category }) {
    const response = await fetch('/api/services/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, minPrice, maxPrice, category }),
    });

    if (!response.ok) {
        throw new Error('Failed to search services');
    }
    return response.json();
}

// Main page component (default export required by Next.js)
export default function AssistancePage() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        query: '',
        minPrice: 0,
        maxPrice: 1000,
        category: ''
    });

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await searchServices(searchParams);
            setServices(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Service Search | Frevi</title>
                <meta name="description" content="Find and filter services" />
            </Head>

            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Service Search</h1>

                {/* Search Controls */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="border p-2 rounded col-span-2"
                            value={searchParams.query}
                            onChange={(e) => setSearchParams({...searchParams, query: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Min price"
                            className="border p-2 rounded"
                            value={searchParams.minPrice}
                            onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Max price"
                            className="border p-2 rounded"
                            value={searchParams.maxPrice}
                            onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                        <p>{error}</p>
                    </div>
                )}

                {/* Results Section */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <div key={service.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-4">
                                    <h2 className="font-bold text-lg mb-2">{service.title}</h2>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-green-600">${service.price}</span>
                                        <span className="text-sm text-gray-500">{service.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}