import { useState, useEffect } from 'react';

export default function ServiceCatalog() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 1000
    });

    useEffect(() => {
        fetch('/api/services/categories')
            .then(res => res.json())
            .then(setCategories);

        fetchServices();
    }, []);

    const fetchServices = () => {
        const query = new URLSearchParams(filters).toString();
        fetch(`/api/services?${query}`)
            .then(res => res.json())
            .then(setServices);
    };

    return (
        <div className="service-catalog">
            <h2>Service Catalog</h2>

            <div className="filters mb-6 p-4 bg-gray-100 rounded">
                <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="mr-4 p-2"
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
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="mr-4 p-2"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="mr-4 p-2"
                />

                <button
                    onClick={fetchServices}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Apply Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="border p-4 rounded-lg">
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                        <p className="text-green-600 font-bold">${service.price}</p>
                        <p className="text-sm text-gray-500">{service.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}