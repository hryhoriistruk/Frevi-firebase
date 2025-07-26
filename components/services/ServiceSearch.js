import { useState, useEffect } from 'react';
import { searchServices } from '../../services/assistance';

export default function ServiceSearch() {
    const [query, setQuery] = useState('');
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 1000,
        category: ''
    });

    useEffect(() => {
        const fetchServices = async () => {
            if (query.trim() || filters.category) {
                try {
                    const results = await searchServices({ query, ...filters });
                    setServices(results);
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        };

        const timer = setTimeout(() => {
            fetchServices();
        }, 500);

        return () => clearTimeout(timer);
    }, [query, filters]);

    return (
        <div className="service-search">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services..."
            />

            <div className="filters">
                <input
                    type="number"
                    placeholder="Min price"
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Max price"
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
            </div>

            <div className="results">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <span>${service.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}