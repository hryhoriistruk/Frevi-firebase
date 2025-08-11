// pages/service/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function ServicesPage() {
    // Mock данные для тесту
    const mockServices = [
        {
            id: '1',
            title: 'Web Development',
            description: 'Professional web development services',
            price: 50,
            category: 'Development'
        },
        {
            id: '2',
            title: 'Graphic Design',
            description: 'Creative graphic design solutions',
            price: 30,
            category: 'Design'
        },
        {
            id: '3',
            title: 'Content Writing',
            description: 'High-quality content writing',
            price: 20,
            category: 'Writing'
        }
    ];

    return (
        <>
            <Head>
                <title>Our Services | Frevi</title>
                <meta name="description" content="Browse all available services on Frevi platform" />
            </Head>

            <div className="container mx-auto py-8 px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#0C4A6E] mb-4">Our Services</h1>
                    <p className="text-gray-600 text-lg">
                        Discover professional services from talented freelancers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                <div className="text-4xl text-gray-400">🔧</div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-sm font-bold text-green-600">
                                        ${service.price}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                        {service.category}
                                    </span>

                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400">★</span>
                                        <span>5.0</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/service/${service.id}`}
                                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition block text-center"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/"
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}

// Прибираємо getServerSideProps поки не налаштуємо Firebase
// export async function getServerSideProps() {
//     return {
//         props: {
//             services: mockServices
//         }
//     };
// }