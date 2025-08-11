// pages/service/[id]/index.js
import Head from 'next/head';
import { getServiceById } from '@/lib/firebase/services';
import ServiceDetails from '@/components/services/ServiceDetails';
import dynamic from 'next/dynamic';

const ClientBookingForm = dynamic(
    () => import('@/components/services/ClientBookingForm'),
    { ssr: false }
);

export default function ServicePage({ service, error }) {
    if (error || !service) {
        return (
            <>
                <Head>
                    <title>Service Not Found | Frevi Services</title>
                    <meta name="description" content="The requested service could not be found." />
                </Head>
                <div className="container py-8">
                    <h1>Service not found</h1>
                    <p>The requested service could not be found.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{service.title} | Frevi Services</title>
                <meta name="description" content={service.description?.substring(0, 160) || 'Frevi service'} />
                <meta property="og:title" content={`${service.title} | Frevi Services`} />
                <meta property="og:description" content={service.description?.substring(0, 160) || 'Frevi service'} />
                <meta property="og:image" content={service.images?.[0] || '/default-service.jpg'} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={`https://yoursite.com/service/${service.id}`} />
            </Head>
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

export async function getServerSideProps({ params }) {
    try {
        const service = await getServiceById(params.id);

        if (!service) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                service,
            },
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            props: {
                service: null,
                error: error.message,
            },
        };
    }
}