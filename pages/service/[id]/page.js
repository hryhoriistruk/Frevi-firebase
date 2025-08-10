import { getServiceById } from '@/lib/firebase/services';
import ServiceDetails from '@/components/services/ServiceDetails';
import ClientBookingForm from '@/components/services/ClientBookingForm';
export async function generateMetadata({ params }) {
    const res = await fetch(`http://localhost:3000/api/service/${params.id}/metadata`);
    return await res.json();
}
// Перенесіть цю функцію до layout.js, якщо використовуєте App Router
export const metadata = {
    title: 'Frevi Services',
    description: 'Service details page',
};

export default async function ServicePage({ params }) {
    const service = await getServiceById(params.id);

    // Динамічні метадані можна встановити через API
    const dynamicMetadata = {
        title: `${service.title} | Frevi Services`,
        description: service.description.substring(0, 160),
        openGraph: {
            images: service.images?.[0] || '/default-service.jpg',
        },
    };

    return (
        <>
            {/* Додаємо метатеги вручну */}
            <head>
                <title>{dynamicMetadata.title}</title>
                <meta name="description" content={dynamicMetadata.description} />
                <meta property="og:title" content={dynamicMetadata.title} />
                <meta property="og:description" content={dynamicMetadata.description} />
                <meta property="og:image" content={dynamicMetadata.openGraph.images} />
            </head>

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
        </>
    );
}