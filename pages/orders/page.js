'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getOrderStatistics,
    searchOrders
} from '@/lib/api/orderService';
import CreateOrderModal from '@/components/CreateOrderModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filters, setFilters] = useState({ status: '', customer: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [statistics, setStatistics] = useState(null);

    const loadOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getOrders(filters);
            setOrders(response.data);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const loadStatistics = useCallback(async () => {
        try {
            const response = await getOrderStatistics();
            setStatistics(response.data);
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }, []);

    useEffect(() => {
        loadOrders();
        loadStatistics();
    }, [loadOrders, loadStatistics]);

    const handleOrderCreated = (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
        setShowCreateModal(false);
        loadStatistics();
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            loadStatistics();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(orderId);
                setOrders((prev) => prev.filter((order) => order.id !== orderId));
                loadStatistics();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const handleViewOrder = async (orderId) => {
        try {
            const response = await getOrderById(orderId);
            setSelectedOrder(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        if (trimmed) {
            try {
                setLoading(true);
                const response = await searchOrders(trimmed);
                setOrders(response.data);
            } catch (error) {
                console.error('Error searching orders:', error);
            } finally {
                setLoading(false);
            }
        } else {
            loadOrders();
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
                    <p className="text-gray-600">Manage and track all orders</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Create New Order
                </button>
            </div>

            {/* Statistics */}
            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {[
                        ['Total Orders', statistics.totalOrders, 'text-gray-900'],
                        ['Pending', statistics.pendingOrders, 'text-yellow-600'],
                        ['In Progress', statistics.inProgressOrders, 'text-blue-600'],
                        ['Completed', statistics.completedOrders, 'text-green-600'],
                        ['Total Revenue', `$${statistics.totalRevenue}`, 'text-gray-900']
                    ].map(([label, value, color], i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                            <p className={`text-2xl font-bold ${color}`}>{value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search orders by customer, service, or provider..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <select
                        value={filters.status}
                        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Filter by customer..."
                        value={filters.customer}
                        onChange={(e) => setFilters((prev) => ({ ...prev, customer: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {[
                                'Order ID',
                                'Customer',
                                'Service',
                                'Provider',
                                'Price',
                                'Status',
                                'Order Date',
                                'Actions'
                            ].map((h, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #{order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{order.customer}</div>
                                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{order.serviceName}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{order.provider}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${order.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{formatDate(order.orderDate)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewOrder(order.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </button>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="text-sm border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                )}
            </div>

            {/* Order Modal */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Order Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Order Info</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                                        <p><strong>Service:</strong> {selectedOrder.serviceName}</p>
                                        <p><strong>Provider:</strong> {selectedOrder.provider}</p>
                                        <p><strong>Price:</strong> ${selectedOrder.price}</p>
                                        <p><strong>Status:</strong>
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Customer Info</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Name:</strong> {selectedOrder.customer}</p>
                                        <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                                        <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                                        <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="font-semibold mb-2">Dates</h3>
                                    <p className="text-sm"><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                                    <p className="text-sm"><strong>Expected Delivery:</strong> {formatDate(selectedOrder.deliveryDate)}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="font-semibold mb-2">Description</h3>
                                    <p className="text-sm text-gray-700">{selectedOrder.description}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Order Modal */}
            <CreateOrderModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onOrderCreated={handleOrderCreated}
            />
        </div>
    );
}
