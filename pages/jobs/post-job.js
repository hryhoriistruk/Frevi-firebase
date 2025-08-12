import { useState } from 'react';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function PostJob() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: '',
        requirements: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Тут буде логіка відправки на сервер
        console.log('Submitting:', formData);

        // Імітація затримки
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        router.push('/jobs');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Post a Service | Frevi" />
            <Navbar />

            <main className="flex-grow bg-gray-50 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-4"
                >
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a Service</h1>
                        <p className="text-gray-600 mb-8">Fill out the form below to post your sevice listing</p>

                        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Service Title*</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Company Name*</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Location*</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Salary Range</label>
                                        <input
                                            type="text"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            placeholder="e.g. $90,000 - $120,000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Job Type*</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Job Description*</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Requirements*</label>
                                        <textarea
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="List requirements, one per line"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Job'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}