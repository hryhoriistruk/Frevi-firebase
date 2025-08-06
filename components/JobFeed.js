import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const JobFeed = ({ limit }) => {
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Тут буде реальний запит до API
        const mockJobs = [
            {
                id: 1,
                title: "Senior React Developer",
                company: "Tech Innovations Inc.",
                location: "Remote",
                salary: "$90,000 - $120,000",
                posted: "2 days ago",
                logo: "/images/company1.png"
            },
            {
                id: 2,
                title: "UX/UI Designer",
                company: "Creative Solutions",
                location: "New York, NY",
                salary: "$80,000 - $100,000",
                posted: "1 week ago",
                logo: "/images/company2.png"
            },
            {
                id: 3,
                title: "Backend Engineer (Node.js)",
                company: "Data Systems LLC",
                location: "San Francisco, CA",
                salary: "$110,000 - $140,000",
                posted: "3 days ago",
                logo: "/images/company3.png"
            },
            {
                id: 4,
                title: "Product Manager",
                company: "Innovate Tech",
                location: "Chicago, IL",
                salary: "$95,000 - $125,000",
                posted: "Just now",
                logo: "/images/company4.png"
            }
        ];

        setJobs(limit ? mockJobs.slice(0, limit) : mockJobs);
        setLoading(false);
    }, [limit]);

    if (loading) return <div>Loading jobs...</div>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job, index) => (
                <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                >
                    <div className="flex items-center mb-4">
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-12 h-12 object-contain mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.salary}
                        </p>
                        <p className="text-sm text-gray-500">{job.posted}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default JobFeed;