import { useState, useEffect } from 'react';

export default function OrderTracker() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            });
    }, []);

    const updateStatus = (orderId, status) => {
        fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(() => {
                setOrders(orders.map(order =>
                    order.id === orderId ? {...order, status} : order
                ));
            });
    };

    return (
        <div className="order-tracker">
            <h2>Your Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <p>Order #{order.id} - {order.status}</p>
                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}