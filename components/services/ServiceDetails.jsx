'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export default function ServiceDetails({ service }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{service.title}</h1>

            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < service.ratingAverage ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600">
          ({service.ratingCount} reviews)
        </span>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={service.images?.[0] || '/placeholder-service.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="prose max-w-none">
                <h2 className="text-xl font-semibold">Description</h2>
                <p>{service.description}</p>
            </div>
        </div>
    );
}