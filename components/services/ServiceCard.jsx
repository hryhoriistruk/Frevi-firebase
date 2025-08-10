'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function ServiceCard({ service }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48">
                <Image
                    src={service.images?.[0] || '/placeholder-service.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">
            {service.ratingAverage?.toFixed(1) || '0.0'} ({service.ratingCount || 0})
          </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">${service.price}</span>
                    <Link
                        href={`/services/${service.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}