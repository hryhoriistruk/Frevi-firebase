import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaBriefcase } from 'react-icons/fa';

export default function JobDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Тут буде запит до API/Firebase
            const mockJob = {
                id: id,
                title: "Senior React Developer",
                company: "Tech Innovations Inc.",
                location: "Remote",
                salary: "$90,000 - $120,000 per year",
                type: "Full-time",
                posted: "2 days ago",
                description: `
          <p>We're looking for an experienced React developer to join our team.</p>
          <h3>Responsibilities:</h3>
          <ul>
            <li>Develop new user-facing features</li>
            <li>Build reusable components</li>
            <li>Optimize applications for maximum performance</li>
          </ul>
          <h3>Requirements:</h3>
          <ul>
            <li>3+ years experience with React</li>
            <li>Strong JavaScript skills</li>
            <li>Experience with Redux</li>
          </ul>
        `,
                logo: "/images/company1.png",
                companyDescription: "Tech Innovations is a leading software development company specializing in web applications."
            };
            setJob(mockJob);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title={`${job.title} at ${job.company} | Frevi`} />
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
                                            src={job.logo}
                                            alt={job.company}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{job.title}</h1>
                                    <h2 className="text-xl text-blue-600 mt-1">{job.company}</h2>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaMoneyBillWave className="mr-2" />
                                            <span>{job.salary}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaBriefcase className="mr-2" />
                                            <span>{job.type}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Posted {job.posted}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: job.description }}
                                    />

                                    <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
                                        Apply Now
                                    </button>
                                </div>

                                <div className="md:col-span-1">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4">About {job.company}</h3>
                                        <p className="text-gray-600 mb-4">{job.companyDescription}</p>

                                        <h4 className="font-semibold mt-6 mb-2">Job Summary</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Job Type:</span>
                                                <span className="font-medium">{job.type}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Location:</span>
                                                <span className="font-medium">{job.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Salary:</span>
                                                <span className="font-medium">{job.salary}</span>
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