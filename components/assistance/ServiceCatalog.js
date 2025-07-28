import { useState, useEffect, useCallback } from 'react';

export default function ServiceCatalog() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 1000
    });

    // Wrap fetchServices in useCallback to prevent unnecessary recreations
    const fetchServices = useCallback(() => {
        const query = new URLSearchParams(filters).toString();
        fetch(`/api/services?${query}`)
            .then(res => res.json())
            .then(setServices)
            .catch(error => console.error('Error fetching services:', error));
    }, [filters]); // Add filters as dependency

    useEffect(() => {
        // Fetch categories
        fetch('/api/services/categories')
            .then(res => res.json())
            .then(setCategories)
            .catch(error => console.error('Error fetching categories:', error));

        // Fetch initial services
        fetchServices();
    }, [fetchServices]); // Add fetchServices as dependency

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="service-catalog">
            <h2 className="text-2xl font-bold mb-6">Service Catalog</h2>

            <div className="filters mb-6 p-4 bg-gray-100 rounded">
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="mr-4 p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="mr-4 p-2 border rounded"
                    min="0"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="mr-4 p-2 border rounded"
                    min={filters.minPrice}
                />

                <button
                    onClick={fetchServices}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Apply Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-2">{service.description}</p>
                        <p className="text-green-600 font-bold mb-1">${service.price}</p>
                        <p className="text-sm text-gray-500">{service.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}