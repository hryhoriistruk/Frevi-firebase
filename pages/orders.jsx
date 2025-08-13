import { useEffect, useState } from 'react';
import { FiPackage, FiCalendar, FiDollarSign, FiSearch, FiFilter } from 'react-icons/fi';
import styles from '@/styles/OrdersPage.module.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders
        .filter(order =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(order => statusFilter === 'all' || order.status === statusFilter)
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === 'price-high') return b.totalAmount - a.totalAmount;
            if (sortBy === 'price-low') return a.totalAmount - b.totalAmount;
            return 0;
        });

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return styles.completed;
            case 'pending': return styles.pending;
            case 'shipped': return styles.shipped;
            case 'cancelled': return styles.cancelled;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <FiPackage className={styles.headerIcon} />
                    <h1>Order Management</h1>
                </div>
                <p>View and manage all customer orders</p>
            </header>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <div className={styles.filter}>
                        <label htmlFor="statusFilter">Status:</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className={styles.filter}>
                        <label htmlFor="sortBy">Sort By:</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price-high">Price (High to Low)</option>
                            <option value="price-low">Price (Low to High)</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className={styles.emptyState}>
                    <FiPackage className={styles.emptyIcon} />
                    <h3>No orders found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className={styles.ordersGrid}>
                    {filteredOrders.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span className={styles.orderId}>#{order.id}</span>
                                <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className={styles.orderCustomer}>
                                <h3>{order.customerName}</h3>
                                <p>{order.customerEmail}</p>
                            </div>

                            <div className={styles.orderDetails}>
                                <div className={styles.detailItem}>
                                    <FiCalendar className={styles.detailIcon} />
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <FiDollarSign className={styles.detailIcon} />
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className={styles.orderItems}>
                                <h4>Items ({order.items.length}):</h4>
                                <ul>
                                    {order.items.slice(0, 3).map((item, index) => (
                                        <li key={index}>
                                            {item.quantity}x {item.name}
                                        </li>
                                    ))}
                                    {order.items.length > 3 && (
                                        <li className={styles.moreItems}>
                                            +{order.items.length - 3} more items
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <button className={styles.viewButton}>
                                View Order Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;