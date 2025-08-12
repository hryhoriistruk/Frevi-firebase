import Head from 'next/head';
import { getServiceById, getAllServiceIds } from '@/lib/firebase/services';
import ServiceDetails from '@/components/services/ServiceDetails';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// Dynamically load booking form (no SSR)
const ClientBookingForm = dynamic(
    () => import('@/components/services/ClientBookingForm'),
    {
        ssr: false,
        loading: () => <div className="p-4 text-center">Loading booking form...</div>
    }
);

export default function ServicePage({ service, error }) {
    const router = useRouter();

    // Handle fallback state
    if (router.isFallback) {
        return (
            <div className="container py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Loading Service...</h1>
                    <p className="mt-2 text-gray-600">Please wait while we load this service</p>
                </div>
            </div>
        );
    }

    // Handle errors or missing service
    if (error || !service) {
        return (
            <>
                <Head>
                    <title>Service Not Found | Frevi Services</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className="container py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl font-bold">Service Not Found</h1>
                        <p className="mt-4 text-lg">
                            The service you're looking for doesn't exist or may have been removed.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{service.title} | Frevi Services</title>
                <meta name="description" content={service.description?.substring(0, 160) || ''} />

                {/* Open Graph / Social Meta */}
                <meta property="og:title" content={`${service.title} | Frevi Services`} />
                <meta property="og:description" content={service.description?.substring(0, 160) || ''} />
                <meta property="og:image" content={service.images?.[0] || '/default-service.jpg'} />
                <meta property="og:url" content={`https://yoursite.com/service/${service.id}`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <main className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ServiceDetails
                            service={service}
                            className="bg-white rounded-lg shadow-sm p-6"
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <ClientBookingForm
                                serviceId={service.id}
                                price={service.price}
                                availability={service.availability}
                                className="bg-white rounded-lg shadow-sm p-6"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getStaticPaths() {
    try {
        // Pre-generate paths for known services
        const serviceIds = await getAllServiceIds();
        const paths = serviceIds.map(id => ({ params: { id } }));

        return {
            paths,
            fallback: 'blocking', // Generates new pages on demand
        };
    } catch (error) {
        console.error('Error generating static paths:', error);
        return {
            paths: [],
            fallback: true,
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const service = await getServiceById(params.id);

        if (!service) {
            return { notFound: true };
        }

        return {
            props: {
                service,
            },
            revalidate: 60 * 60, // 1 hour
        };
    } catch (error) {
        console.error(`Error fetching service ${params.id}:`, error);
        return {
            props: {
                error: error.message,
                service: null,
            },
            revalidate: 10, // 10 seconds
        };
    }
}