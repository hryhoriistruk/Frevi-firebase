import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import HeadTag from '../../components/HeadTag';
// Try importing from firebase-config instead
import { app } from '@lib/firebase/firebase-config';


import Navbar from '../../components/Navbar/Navbar';
import { FaStar, FaPlus, FaComment, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);

export default function ServicesMarketplace() {
    const { currentUser } = useAuth();
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newService, setNewService] = useState({
        title: '',
        description: '',
        category: 'design',
        price: 0,
        images: []
    });
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                let q = query(collection(db, 'services'));
                if (activeTab !== 'all') {
                    q = query(q, where('category', '==', activeTab));
                }
                const snapshot = await getDocs(q);
                setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, [activeTab]);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);

        try {
            const urls = await Promise.all(files.map(async (file) => {
                const storageRef = ref(storage, `services/${currentUser.uid}/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }));

            setNewService(prev => ({ ...prev, images: [...prev.images, ...urls] }));
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Error uploading images. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Post new service
    const handleSubmitService = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('Please log in to post a service.');
            return;
        }

        try {
            await addDoc(collection(db, 'services'), {
                ...newService,
                price: parseFloat(newService.price),
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Anonymous',
                userPhoto: currentUser.photoURL || null,
                createdAt: new Date(),
                status: 'active',
                rating: 0,
                reviews: []
            });

            setShowForm(false);
            setNewService({
                title: '',
                description: '',
                category: 'design',
                price: 0,
                images: []
            });

            // Refresh services list
            const q = query(collection(db, 'services'));
            const snapshot = await getDocs(q);
            setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        } catch (error) {
            console.error('Error posting service:', error);
            alert('Error posting service. Please try again.');
        }
    };

    // Add comment to service
    const handleAddComment = async (serviceId) => {
        if (!newComment.trim() || !currentUser) return;

        try {
            const service = services.find(s => s.id === serviceId);
            const newReview = {
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Anonymous',
                userPhoto: currentUser.photoURL || null,
                text: newComment,
                createdAt: new Date()
            };

            const serviceRef = doc(db, 'services', serviceId);
            await updateDoc(serviceRef, {
                reviews: [...(service?.reviews || []), newReview]
            });

            setNewComment('');

            // Update local state
            const updatedServices = services.map(s =>
                s.id === serviceId
                    ? { ...s, reviews: [...(s.reviews || []), newReview] }
                    : s
            );
            setServices(updatedServices);
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Error adding comment. Please try again.');
        }
    };

    // Place order
    const handlePlaceOrder = async (serviceId) => {
        if (!currentUser) {
            alert('Please log in to place an order.');
            return;
        }

        try {
            const service = services.find(s => s.id === serviceId);
            if (!service) {
                alert('Service not found.');
                return;
            }

            await addDoc(collection(db, 'orders'), {
                serviceId,
                serviceTitle: service.title,
                buyerId: currentUser.uid,
                buyerName: currentUser.displayName || 'Anonymous',
                buyerEmail: currentUser.email,
                sellerId: service.userId,
                sellerName: service.userName,
                status: 'pending',
                createdAt: new Date(),
                price: service.price,
                serviceImage: service.images?.[0] || null
            });

            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <HeadTag title="Frevi - Services Marketplace" />
            <Navbar />

            <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-[#0C4A6E]">Services Marketplace</h1>
                        {currentUser && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                <FaPlus className="mr-2" /> Post a Service
                            </button>
                        )}
                    </div>

                    {/* Category tabs */}
                    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                        {['all', 'design', 'development', 'marketing', 'writing'].map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-4 py-2 rounded-full capitalize whitespace-nowrap ${activeTab === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white"
                            >
                                {service.images && service.images[0] && (
                                    <img
                                        src={service.images[0]}
                                        className="w-full h-48 object-cover cursor-pointer"
                                        alt={service.title}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold line-clamp-2">{service.title}</h3>
                                        <span className="font-bold text-blue-600 ml-2">${service.price}</span>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                                    <div className="flex items-center mb-4">
                                        <img
                                            src={service.userPhoto || '/default-avatar.png'}
                                            className="w-8 h-8 rounded-full mr-2"
                                            alt={service.userName || 'User'}
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png';
                                            }}
                                        />
                                        <span className="text-sm">{service.userName || 'Anonymous'}</span>
                                        <div className="flex items-center ml-auto">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span className="text-sm">{service.rating || 'New'}</span>
                                        </div>
                                    </div>

                                    {/* Order button */}
                                    {currentUser && currentUser.uid !== service.userId && (
                                        <button
                                            onClick={() => handlePlaceOrder(service.id)}
                                            className="w-full flex items-center justify-center py-2 bg-green-600 text-white rounded mb-3 hover:bg-green-700 transition"
                                        >
                                            <FaShoppingCart className="mr-2" /> Order Now
                                        </button>
                                    )}

                                    {/* Comments section */}
                                    <div className="border-t pt-3">
                                        <div className="max-h-40 overflow-y-auto mb-2">
                                            {service.reviews && service.reviews.length > 0 ? (
                                                service.reviews.slice(-3).map((review, i) => (
                                                    <div key={i} className="mb-2 last:mb-0">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={review.userPhoto || '/default-avatar.png'}
                                                                className="w-6 h-6 rounded-full mr-2"
                                                                alt={review.userName || 'User'}
                                                                onError={(e) => {
                                                                    e.target.src = '/default-avatar.png';
                                                                }}
                                                            />
                                                            <span className="font-medium text-sm">{review.userName || 'Anonymous'}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 ml-8">{review.text}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-400">No reviews yet</p>
                                            )}
                                        </div>

                                        {currentUser && (
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Add a comment..."
                                                    className="flex-1 px-3 py-1 border rounded-l text-sm focus:outline-none focus:border-blue-500"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleAddComment(service.id);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleAddComment(service.id)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded-r text-sm hover:bg-blue-700 transition disabled:opacity-50"
                                                    disabled={!newComment.trim()}
                                                >
                                                    <FaComment />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* No services message */}
                    {services.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No services found in this category.</p>
                            {currentUser && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Be the first to post a service!
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Service form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Post a Service</h2>
                        <form onSubmit={handleSubmitService}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Title*</label>
                                <input
                                    type="text"
                                    value={newService.title}
                                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Enter service title"
                                    maxLength="100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Description*</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 resize-none"
                                    rows="4"
                                    required
                                    placeholder="Describe your service"
                                    maxLength="1000"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Category*</label>
                                <select
                                    value={newService.category}
                                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="design">Design</option>
                                    <option value="development">Development</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="writing">Writing</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Price ($)*</label>
                                <input
                                    type="number"
                                    value={newService.price}
                                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                    min="0"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium">Images (Max 5)</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    multiple
                                    className="w-full p-2 border rounded"
                                    accept="image/*"
                                    disabled={uploading || newService.images.length >= 5}
                                />
                                {uploading && <p className="text-sm text-blue-500 mt-1">Uploading images...</p>}
                                <div className="flex flex-wrap mt-2 gap-2">
                                    {newService.images.map((img, i) => (
                                        <div key={i} className="relative">
                                            <img
                                                src={img}
                                                className="w-20 h-20 object-cover rounded border"
                                                alt={`Preview ${i + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNewService({
                                                    ...newService,
                                                    images: newService.images.filter((_, index) => index !== i)
                                                })}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setNewService({
                                            title: '',
                                            description: '',
                                            category: 'design',
                                            price: 0,
                                            images: []
                                        });
                                    }}
                                    className="px-4 py-2 border rounded hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                                    disabled={uploading}
                                >
                                    {uploading ? 'Posting...' : 'Post Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}