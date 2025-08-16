import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaClock,
    FaBroom,
    FaTools,
    FaTruckMoving,
    FaHome
} from 'react-icons/fa';

const JobFeed = ({ limit }) => {
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for services
        const mockServices = [
            {
                id: 1,
                title: "Apartment Deep Cleaning",
                company: "CleanHome Services",
                location: "Kyiv, Ukraine",
                price: "₴800 - ₴1500",
                posted: "2 days ago",
                type: "Cleaning",
                logo: "/images/cleaning-service.png"
            },
            {
                id: 2,
                title: "Furniture Assembly",
                company: "HandyPro",
                location: "Lviv, Ukraine",
                price: "₴500 - ₴3000",
                posted: "1 week ago",
                type: "Installation",
                logo: "/images/handypro.png"
            },
            {
                id: 3,
                title: "Local Moving Assistance",
                company: "EasyMove",
                location: "Odesa, Ukraine",
                price: "₴2000 - ₴8000",
                posted: "3 days ago",
                type: "Moving",
                logo: "/images/easymove.png"
            },
            {
                id: 4,
                title: "Plumbing Repair",
                company: "FixIt Pro",
                location: "Kharkiv, Ukraine",
                price: "₴600 - ₴2500",
                posted: "Just now",
                type: "Repair",
                logo: "/images/fixit.png"
            },
            {
                id: 5,
                title: "Window Installation",
                company: "Home Comfort",
                location: "Dnipro, Ukraine",
                price: "₴3000 - ₴10000",
                posted: "5 hours ago",
                type: "Installation",
                logo: "/images/home-comfort.png"
            },
            {
                id: 6,
                title: "Carpet Cleaning",
                company: "FreshClean",
                location: "Kyiv, Ukraine",
                price: "₴400 - ₴1200",
                posted: "1 day ago",
                type: "Cleaning",
                logo: "/images/freshclean.png"
            },
            {
                id: 7,
                title: "Appliance Installation",
                company: "TechHandlers",
                location: "Lviv, Ukraine",
                price: "₴700 - ₴3500",
                posted: "2 days ago",
                type: "Installation",
                logo: "/images/techhandlers.png"
            },
            {
                id: 8,
                title: "Office Cleaning",
                company: "ProClean",
                location: "Kyiv, Ukraine",
                price: "₴1500 - ₴5000",
                posted: "1 week ago",
                type: "Cleaning",
                logo: "/images/proclean.png"
            }
        ];

        setServices(limit ? mockServices.slice(0, limit) : mockServices);
        setLoading(false);
    }, [limit]);

    const getServiceIcon = (type) => {
        switch(type.toLowerCase()) {
            case 'cleaning':
                return <FaBroom className="mr-2" />;
            case 'installation':
                return <FaTools className="mr-2" />;
            case 'moving':
                return <FaTruckMoving className="mr-2" />;
            case 'repair':
                return <FaTools className="mr-2" />;
            default:
                return <FaHome className="mr-2" />;
        }
    };

    if (loading) return <div className="text-center py-8">Loading services...</div>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
                <Link
                    href={`/jobs/${service.id}`}
                    key={service.id}
                    passHref
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={service.logo}
                                alt={service.company}
                                className="w-12 h-12 object-contain mr-4"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{service.title}</h3>
                                <p className="text-gray-600">{service.company}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="flex items-center text-gray-600">
                                <FaMapMarkerAlt className="mr-2" />
                                {service.location}
                            </p>
                            <p className="flex items-center text-gray-600">
                                <FaMoneyBillWave className="mr-2" />
                                {service.price}
                            </p>
                            <p className="flex items-center text-gray-600">
                                {getServiceIcon(service.type)}
                                {service.type}
                            </p>
                            <p className="text-sm text-gray-500">
                                <FaClock className="inline mr-2" />
                                {service.posted}
                            </p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
};

export default JobFeed;