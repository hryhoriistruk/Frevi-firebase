import { useState } from 'react';
import { storage, firestore } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function ServiceForm({ onClose }) {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('design');
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);

        const urls = await Promise.all(files.map(async (file) => {
            const storageRef = ref(storage, `services/${currentUser.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        }));

        setImages(prev => [...prev, ...urls]);
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(firestore, 'services'), {
            userId: currentUser.uid,
            title,
            description,
            category,
            price: Number(price),
            images,
            createdAt: new Date(),
            status: 'active',
            rating: 0,
            reviews: []
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Post a Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="design">Design</option>
                            <option value="development">Development</option>
                            <option value="marketing">Marketing</option>
                            <option value="writing">Writing</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Price ($)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border rounded"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Images</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            multiple
                            className="w-full p-2 border rounded"
                            accept="image/*"
                        />
                        {uploading && <p>Uploading images...</p>}
                        <div className="flex flex-wrap mt-2">
                            {images.map((img, i) => (
                                <img key={i} src={img} className="w-20 h-20 object-cover m-1" />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            disabled={uploading}
                        >
                            Post Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}