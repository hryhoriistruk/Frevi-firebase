// app/service/[id]/page.js
'use client'; // Додаємо тільки якщо потрібні хуки чи інтерактивність

import { getServiceById } from '@/lib/firebase/services';
import ServiceDetails from '@/components/services/ServiceDetails';
import ClientBookingForm from '@/components/services/ClientBookingForm';

export default async function ServicePage({ params }) {
    const service = await getServiceById(params.id);

    return (
        <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ServiceDetails service={service} />
                </div>
                <div className="lg:col-span-1">
                    <ClientBookingForm serviceId={service.id} price={service.price} />
                </div>
            </div>
        </div>
    );
}