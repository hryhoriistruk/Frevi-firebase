import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/context/AuthContext'; // Use our custom auth context

export default function CreateOrder() {
    const { user, loading } = useAuth(); // Replace useSession with our auth context
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [orderData, setOrderData] = useState({
        title: '',
        description: '',
        price: 0
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle loading and authentication
    useEffect(() => {
        if (isClient && !loading && !user) {
            router.push('/auth/login');
        }
    }, [isClient, loading, user, router]);

    if (!isClient || loading) {
        return <div className="order-form">Loading...</div>;
    }

    if (!user) {
        return <div className="order-form">Redirecting to login...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...orderData,
                userId: user.id // Use user.id from our context
            }),
        });

        if (response.ok) {
            router.push('/orders');
        }
    }

    return (
        <div className="order-form">
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Service Title:
                    <input
                        value={orderData.title}
                        onChange={(e) => setOrderData({...orderData, title: e.target.value})}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={orderData.description}
                        onChange={(e) => setOrderData({...orderData, description: e.target.value})}
                        required
                    />
                </label>

                <label>
                    Price ($):
                    <input
                        type="number"
                        value={orderData.price}
                        onChange={(e) => setOrderData({...orderData, price: Number(e.target.value)})}
                        min="0"
                        required
                    />
                </label>

                <button type="submit">Create Order</button>
            </form>
        </div>
    )
}