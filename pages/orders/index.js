'use client';

import {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
} from '@/lib/api/orderService';

export default function OrdersPage({ orders }) {
    return (
        <div>
            <h1>Orders</h1>
            {orders.map((order) => (
                <div key={order.id}>{order.name}</div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const orders = await getOrders();
    return { props: { orders } };
}