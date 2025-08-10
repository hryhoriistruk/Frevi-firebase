import { useState } from 'react';
import { useRouter } from 'next/router';
import OrderModal from './OrderModal';

export default function ServiceCard({ service, currentUser }) {
    const router = useRouter();
    const [showOrderModal, setShowOrderModal] = useState(false);

    return (
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            {service.images[0] && (
                <img
                    src={service.images[0]}
                    className="w-full h-48 object-cover"
                    onClick={() => router.push(`/services/${service.id}`)}
                />
            )}

            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold">${service.price}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {service.category}
          </span>
                </div>

                {currentUser && currentUser.uid !== service.userId && (
                    <button
                        onClick={() => setShowOrderModal(true)}
                        className="w-full mt-4 py-2 bg-green-600 text-white rounded"
                    >
                        Order Now
                    </button>
                )}
            </div>

            {showOrderModal && (
                <OrderModal
                    service={service}
                    onClose={() => setShowOrderModal(false)}
                />
            )}
        </div>
    );
}