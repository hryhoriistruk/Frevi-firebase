import { useEffect, useState } from 'react';
import { getOrders } from '../api/orderService';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            {orders.map((order) => (
                <div key={order.id}>{order.name}</div>
            ))}
        </div>
    );
};

export default OrdersPage;