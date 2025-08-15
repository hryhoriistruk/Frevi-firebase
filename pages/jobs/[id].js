import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaTools, FaBroom, FaHome, FaTruckMoving } from 'react-icons/fa';

export default function ServiceDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Mock data for services
            const mockServices = [
                {
                    id: '1',
                    title: "Professional Apartment Cleaning",
                    company: "CleanHome Services",
                    location: "Kyiv, Ukraine",
                    price: "₴800 - ₴1500 depending on size",
                    type: "Cleaning Service",
                    posted: "1 day ago",
                    description: `
                        <p>We provide high-quality cleaning services for apartments and houses.</p>
                        <h3>Service includes:</h3>
                        <ul>
                            <li>Dusting and wiping all surfaces</li>
                            <li>Vacuuming and mopping floors</li>
                            <li>Bathroom and kitchen deep cleaning</li>
                            <li>Window cleaning (interior)</li>
                            <li>Taking out trash</li>
                        </ul>
                        <h3>What we offer:</h3>
                        <ul>
                            <li>Professional equipment and eco-friendly products</li>
                            <li>Experienced cleaners</li>
                            <li>Flexible scheduling</li>
                            <li>100% satisfaction guarantee</li>
                        </ul>
                    `,
                    logo: "/images/cleaning-service.png",
                    companyDescription: "CleanHome Services has been providing professional cleaning services in Kyiv since 2015. We pride ourselves on attention to detail and reliable service."
                },
                {
                    id: '2',
                    title: "Furniture Assembly & Installation",
                    company: "HandyPro",
                    location: "Lviv, Ukraine",
                    price: "₴500 - ₴3000 depending on complexity",
                    type: "Installation Service",
                    posted: "3 days ago",
                    description: `
                        <p>Need help assembling your new furniture? We've got you covered!</p>
                        <h3>We can assemble:</h3>
                        <ul>
                            <li>IKEA and other flat-pack furniture</li>
                            <li>Wardrobes and shelving units</li>
                            <li>Beds and bedroom furniture</li>
                            <li>Office furniture</li>
                            <li>Kitchen cabinets</li>
                        </ul>
                        <h3>Additional services:</h3>
                        <ul>
                            <li>TV mounting</li>
                            <li>Picture hanging</li>
                            <li>Shelf installation</li>
                            <li>Minor home repairs</li>
                        </ul>
                    `,
                    logo: "/images/handypro.png",
                    companyDescription: "HandyPro is your trusted partner for all assembly and installation needs in Lviv. Our technicians are skilled, punctual, and careful with your belongings."
                },
                {
                    id: '3',
                    title: "Local Moving Assistance",
                    company: "EasyMove",
                    location: "Odesa, Ukraine",
                    price: "₴2000 - ₴8000 depending on volume",
                    type: "Moving Service",
                    posted: "5 days ago",
                    description: `
                        <p>Stress-free moving services within Odesa and surrounding areas.</p>
                        <h3>Our moving package includes:</h3>
                        <ul>
                            <li>Loading and unloading of belongings</li>
                            <li>Transportation in our equipped trucks</li>
                            <li>Furniture disassembly/reassembly</li>
                            <li>Careful handling of fragile items</li>
                            <li>Basic packing materials provided</li>
                        </ul>
                        <h3>Optional extras:</h3>
                        <ul>
                            <li>Full packing service</li>
                            <li>Temporary storage solutions</li>
                            <li>Cleaning of old/new residence</li>
                            <li>Help with appliance setup</li>
                        </ul>
                    `,
                    logo: "/images/easymove.png",
                    companyDescription: "EasyMove makes relocation simple. With 10 years of experience, we handle your move efficiently while taking care of your possessions as if they were our own."
                }
            ];

            const selectedService = mockServices.find(service => service.id === id);
            setService(selectedService);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const getServiceIcon = () => {
        if (service.type.includes('Cleaning')) return <FaBroom className="mr-2" />;
        if (service.type.includes('Installation')) return <FaTools className="mr-2" />;
        if (service.type.includes('Moving')) return <FaTruckMoving className="mr-2" />;
        return <FaHome className="mr-2" />;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title={`${service.title} | ${service.company} | ServiceHub`} />
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="flex items-start">
                                <div className="mr-6">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={service.logo}
                                            alt={service.company}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{service.title}</h1>
                                    <h2 className="text-xl text-blue-600 mt-1">{service.company}</h2>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>{service.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaMoneyBillWave className="mr-2" />
                                            <span>{service.price}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            {getServiceIcon()}
                                            <span>{service.type}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Posted {service.posted}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold mb-4">Service Details</h3>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />

                                    <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                        Book This Service
                                    </button>
                                </div>

                                <div className="md:col-span-1">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4">About {service.company}</h3>
                                        <p className="text-gray-600 mb-4">{service.companyDescription}</p>

                                        <h4 className="font-semibold mt-6 mb-2">Service Summary</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Service Type:</span>
                                                <span className="font-medium">{service.type}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Location:</span>
                                                <span className="font-medium">{service.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Price Range:</span>
                                                <span className="font-medium">{service.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}