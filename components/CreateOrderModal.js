// components/CreateOrderModal.js
'use client';

import { useState, useEffect } from 'react';
import { getServices, createOrder } from '@/lib/api/orderService';

export default function CreateOrderModal({ isOpen, onClose, onOrderCreated }) {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceId: '',
        customer: '',
        customerEmail: '',
        paymentMethod: 'card',
        deliveryAddress: '',
        description: '',
        customPrice: ''
    });

    useEffect(() => {
        if (isOpen) {
            loadServices();
        }
    }, [isOpen]);

    const loadServices = async () => {
        try {
            const response = await getServices({ available: true });
            setServices(response.data);
        } catch (error) {
            console.error('Error loading services:', error);
        }
    };

    const handleServiceChange = (serviceId) => {
        const service = services.find(s => s.id === parseInt(serviceId));
        setSelectedService(service);
        setFormData(prev => ({
            ...prev,
            serviceId: serviceId,
            customPrice: service ? service.price.toString() : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                serviceId: parseInt(formData.serviceId),
                serviceName: selectedService?.title || '',
                provider: selectedService?.provider || '',
                customer: formData.customer,
                customerEmail: formData.customerEmail,
                price: parseFloat(formData.customPrice) || selectedService?.price || 0,
                paymentMethod: formData.paymentMethod,
                deliveryAddress: formData.deliveryAddress,
                description: formData.description || selectedService?.description || '',
                orderDate: new Date().toISOString(),
                deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                status: 'pending'
            };

            const response = await createOrder(orderData);
            onOrderCreated(response.data);
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            serviceId: '',
            customer: '',
            customerEmail: '',
            paymentMethod: 'card',
            deliveryAddress: '',
            description: '',
            customPrice: ''
        });
        setSelectedService(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Create New Order</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Service Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Service *
                            </label>
                            <select
                                name="serviceId"
                                value={formData.serviceId}
                                onChange={(e) => handleServiceChange(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choose a service...</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.title} - ${service.price} ({service.provider})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Selected Service Info */}
                        {selectedService && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900">{selectedService.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">Provider: {selectedService.provider}</p>
                                <p className="text-sm text-gray-600 mb-2">Category: {selectedService.category}</p>
                                <p className="text-sm text-gray-600 mb-2">Duration: {selectedService.duration}</p>
                                <p className="text-sm text-gray-700">{selectedService.description}</p>
                            </div>
                        )}

                        {/* Customer Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    name="customer"
                                    value={formData.customer}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Customer Email *
                                </label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Price and Payment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="customPrice"
                                    value={formData.customPrice}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment Method *
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="cash">Cash</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Delivery Address
                            </label>
                            <input
                                type="text"
                                name="deliveryAddress"
                                value={formData.deliveryAddress}
                                onChange={handleInputChange}
                                placeholder="Enter delivery address or 'Remote' for online services"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Notes
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Any special requirements or notes for this order..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}