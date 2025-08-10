import { useState, useEffect } from 'react';
import { firestore, storage } from '../firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import { FaStar, FaPlus, FaComment, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
            let q = query(collection(firestore, 'services'));
            if (activeTab !== 'all') {
                q = query(q, where('category', '==', activeTab));
            }
            const snapshot = await getDocs(q);
            setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchServices();
    }, [activeTab]);

    // Handle image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);

        const urls = await Promise.all(files.map(async (file) => {
            const storageRef = ref(storage, `services/${currentUser.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        }));

        setNewService(prev => ({ ...prev, images: [...prev.images, ...urls] }));
        setUploading(false);
    };

    // Post new service
    const handleSubmitService = async (e) => {
        e.preventDefault();

        await addDoc(collection(firestore, 'services'), {
            ...newService,
            userId: currentUser.uid,
            userName: currentUser.displayName,
            userPhoto: currentUser.photoURL,
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
    };

    // Add comment to service
    const handleAddComment = async (serviceId) => {
        if (!newComment.trim()) return;

        const serviceRef = doc(firestore, 'services', serviceId);
        await updateDoc(serviceRef, {
            reviews: [...(services.find(s => s.id === serviceId)?.reviews || []), {
                userId: currentUser.uid,
                userName: currentUser.displayName,
                userPhoto: currentUser.photoURL,
                text: newComment,
                createdAt: new Date()
            }]
        });

        setNewComment('');
    };

    // Place order
    const handlePlaceOrder = async (serviceId) => {
        const service = services.find(s => s.id === serviceId);
        await addDoc(collection(firestore, 'orders'), {
            serviceId,
            serviceTitle: service.title,
            buyerId: currentUser.uid,
            buyerName: currentUser.displayName,
            sellerId: service.userId,
            sellerName: service.userName,
            status: 'pending',
            createdAt: new Date(),
            price: service.price,
            serviceImage: service.images[0] || null
        });
        alert('Order placed successfully!');
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
                                className={`px-4 py-2 rounded-full capitalize ${activeTab === category
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
                                {service.images[0] && (
                                    <img
                                        src={service.images[0]}
                                        className="w-full h-48 object-cover cursor-pointer"
                                        alt={service.title}
                                    />
                                )}

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold">{service.title}</h3>
                                        <span className="font-bold text-blue-600">${service.price}</span>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                                    <div className="flex items-center mb-4">
                                        <img
                                            src={service.userPhoto || '/default-avatar.png'}
                                            className="w-8 h-8 rounded-full mr-2"
                                            alt={service.userName}
                                        />
                                        <span className="text-sm">{service.userName}</span>
                                        <div className="flex items-center ml-auto">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{service.rating || 'New'}</span>
                                        </div>
                                    </div>

                                    {/* Order button */}
                                    {currentUser && currentUser.uid !== service.userId && (
                                        <button
                                            onClick={() => handlePlaceOrder(service.id)}
                                            className="w-full flex items-center justify-center py-2 bg-green-600 text-white rounded mb-3 hover:bg-green-700"
                                        >
                                            <FaShoppingCart className="mr-2" /> Order Now
                                        </button>
                                    )}

                                    {/* Comments section */}
                                    <div className="border-t pt-3">
                                        <div className="max-h-40 overflow-y-auto mb-2">
                                            {service.reviews?.map((review, i) => (
                                                <div key={i} className="mb-2 last:mb-0">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={review.userPhoto || '/default-avatar.png'}
                                                            className="w-6 h-6 rounded-full mr-2"
                                                            alt={review.userName}
                                                        />
                                                        <span className="font-medium text-sm">{review.userName}</span>
                                                    </div>
                                                    <p className="text-sm ml-8">{review.text}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {currentUser && (
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Add a comment..."
                                                    className="flex-1 px-3 py-1 border rounded-l text-sm"
                                                />
                                                <button
                                                    onClick={() => handleAddComment(service.id)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded-r text-sm"
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
                </div>
            </main>

            {/* Service form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Post a Service</h2>
                        <form onSubmit={handleSubmitService}>
                            <div className="mb-4">
                                <label className="block mb-2">Title*</label>
                                <input
                                    type="text"
                                    value={newService.title}
                                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Description*</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Category*</label>
                                <select
                                    value={newService.category}
                                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="design">Design</option>
                                    <option value="development">Development</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="writing">Writing</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Price ($)*</label>
                                <input
                                    type="number"
                                    value={newService.price}
                                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Images (Max 5)</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    multiple
                                    className="w-full p-2 border rounded"
                                    accept="image/*"
                                    max="5"
                                />
                                {uploading && <p className="text-sm text-gray-500">Uploading images...</p>}
                                <div className="flex flex-wrap mt-2">
                                    {newService.images.map((img, i) => (
                                        <div key={i} className="relative m-1">
                                            <img src={img} className="w-20 h-20 object-cover rounded" />
                                            <button
                                                type="button"
                                                onClick={() => setNewService({
                                                    ...newService,
                                                    images: newService.images.filter((_, index) => index !== i)
                                                })}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="mr-2 px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
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