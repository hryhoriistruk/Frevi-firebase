'use client';

import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit, FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { getOrders, deleteOrder } from '@/lib/orderService';
import styles from '/Users/grigorii/IdeaProjects/Frevi-firebase8666/pages/orders/OrdersPage.module.css';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrders();
            setOrders(res.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            setOrders(orders.filter((order) => order.id !== id));
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredOrders = orders
        .filter(order =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Order Management</h1>
                    <p className={styles.subtitle}>{orders.length} total orders</p>
                </div>
                <div className={styles.actions}>
                    <button className={styles.refreshButton} onClick={fetchOrders}>
                        <FiRefreshCw />
                    </button>
                    <button className={styles.addButton}>
                        <FiPlus /> Add Order
                    </button>
                </div>
            </header>

            <div className={styles.toolbar}>
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
            </div>

            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No orders found</p>
                    <button className={styles.addButton} onClick={fetchOrders}>
                        <FiRefreshCw /> Refresh
                    </button>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>
                                Order ID {sortConfig.key === 'id' && (
                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                            </th>
                            <th onClick={() => handleSort('customerName')}>
                                Customer {sortConfig.key === 'customerName' && (
                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                            </th>
                            <th onClick={() => handleSort('createdAt')}>
                                Date {sortConfig.key === 'createdAt' && (
                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                            </th>
                            <th onClick={() => handleSort('status')}>
                                Status {sortConfig.key === 'status' && (
                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                            </th>
                            <th onClick={() => handleSort('totalAmount')}>
                                Amount {sortConfig.key === 'totalAmount' && (
                                <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                            )}
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className={styles.orderId}>#{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td>
                                        <span className={`${styles.status} ${styles[order.status]}`}>
                                            {order.status}
                                        </span>
                                </td>
                                <td className={styles.amount}>{formatCurrency(order.totalAmount)}</td>
                                <td className={styles.actionsCell}>
                                    <button className={styles.editButton}>
                                        <FiEdit />
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}