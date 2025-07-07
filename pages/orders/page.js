'use client';

import { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '@/lib/orderService';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then((res) => setOrders(res.data));
    }, []);

    const handleDelete = async (id) => {
        await deleteOrder(id);
        setOrders(orders.filter((order) => order.id !== id));
    };

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.name}
                        <button onClick={() => handleDelete(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}