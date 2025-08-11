// components/services/ServiceCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function ServiceCard({ service }) {
    if (!service) {
        return null;
    }

    return (
        <Link href={`/service/${service.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {service.images && service.images[0] && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={service.images[0]}
                            alt={service.title || 'Service image'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {service.title || 'Untitled Service'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {service.description || 'No description available'}
                    </p>
                    {service.price && (
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">
                                ${service.price}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}