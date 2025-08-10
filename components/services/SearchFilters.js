'use client';

import { useRouter } from 'next/navigation';

export default function SearchFilters() {
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams();

        if (formData.get('category')) params.set('category', formData.get('category'));
        if (formData.get('minPrice')) params.set('minPrice', formData.get('minPrice'));
        if (formData.get('maxPrice')) params.set('maxPrice', formData.get('maxPrice'));

        router.push(`/services?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-wrap gap-4">
                <select
                    name="category"
                    className="border rounded-md px-3 py-2 text-sm"
                >
                    <option value="">All Categories</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="marketing">Marketing</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min price"
                    className="border rounded-md px-3 py-2 text-sm w-24"
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max price"
                    className="border rounded-md px-3 py-2 text-sm w-24"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                    Filter
                </button>
            </div>
        </form>
    );
}