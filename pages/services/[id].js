import { useState } from 'react';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext'; // Adjust this import based on your auth setup

export default function PostService() {
    const router = useRouter();
    const { currentUser } = useAuth(); // Get current user from your auth context
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
    const [error, setError] = useState(null);

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
        setError(null);

        try {
            // Add service to Firestore
            const docRef = await addDoc(collection(db, 'services'), {
                ...formData,
                createdAt: serverTimestamp(),
                authorId: currentUser.uid,
                authorName: currentUser.displayName || 'Anonymous',
                status: 'active',
                rating: 0,
                reviewsCount: 0
            });

            // Redirect to the newly created service page
            router.push(`/services/${docRef.id}`);
        } catch (err) {
            console.error('Error creating service:', err);
            setError('Failed to create service. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                            {error && (
                                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}
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
                                            maxLength="100"
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
                                            maxLength="2000"
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
                                            maxLength="1000"
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
                                            maxLength="500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </span>
                                        ) : 'Create Service'}
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