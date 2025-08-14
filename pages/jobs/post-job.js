import { useState } from 'react';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function PostService() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Design',
        price: '',
        duration: '',
        description: '',
        deliverables: '',
        skillsRequired: ''
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

        // Here will be the logic to submit to the server
        console.log('Submitting service:', formData);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        router.push('/services');
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
                        <p className="text-gray-600 mb-8">Fill out the form below to create your service listing</p>

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
                                            placeholder="e.g. Professional Logo Design"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Category*</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="Design">Design</option>
                                            <option value="Development">Development</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Writing">Writing</option>
                                            <option value="Consulting">Consulting</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Price*</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="e.g. $100 or $50/hour"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Estimated Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="e.g. 3-5 days"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Service Description*</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={6}
                                            placeholder="Describe your service in detail"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Deliverables*</label>
                                        <textarea
                                            name="deliverables"
                                            value={formData.deliverables}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="What will the client receive? (e.g., Source files, Documentation, etc.)"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Skills Required</label>
                                        <textarea
                                            name="skillsRequired"
                                            value={formData.skillsRequired}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="List any specific skills or tools required for this service"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Service'}
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