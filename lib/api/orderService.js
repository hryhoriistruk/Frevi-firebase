// lib/api/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:9191'; // Your OrderService URL

const orderService = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock data for development (remove in production)
const mockOrders = [
    {
        id: 1,
        serviceId: 1,
        serviceName: "Web Development",
        provider: "IT Studio Pro",
        customer: "John Doe",
        customerEmail: "john@example.com",
        price: 1500,
        status: "pending",
        orderDate: "2024-01-15T10:30:00Z",
        deliveryDate: "2024-01-29T10:30:00Z",
        description: "Corporate website development",
        paymentMethod: "card",
        deliveryAddress: "123 Main St, City"
    },
    {
        id: 2,
        serviceId: 2,
        serviceName: "Photography Session",
        provider: "PhotoArt",
        customer: "Jane Smith",
        customerEmail: "jane@example.com",
        price: 800,
        status: "completed",
        orderDate: "2024-01-10T14:00:00Z",
        deliveryDate: "2024-01-10T17:00:00Z",
        description: "Professional studio photography",
        paymentMethod: "cash",
        deliveryAddress: "Studio Address"
    },
    {
        id: 3,
        serviceId: 1,
        serviceName: "Mobile App Development",
        provider: "Tech Solutions",
        customer: "Mike Johnson",
        customerEmail: "mike@example.com",
        price: 2500,
        status: "in-progress",
        orderDate: "2024-01-12T09:00:00Z",
        deliveryDate: "2024-02-12T09:00:00Z",
        description: "iOS and Android app development",
        paymentMethod: "card",
        deliveryAddress: "Remote delivery"
    }
];

const mockServices = [
    {
        id: 1,
        title: "Web Development",
        provider: "IT Studio Pro",
        price: 1500,
        rating: 4.8,
        category: "IT",
        duration: "2 weeks",
        description: "Corporate website development",
        available: true
    },
    {
        id: 2,
        title: "Photography Session",
        provider: "PhotoArt",
        price: 800,
        rating: 4.9,
        category: "Photography",
        duration: "3 hours",
        description: "Professional studio photography",
        available: true
    },
    {
        id: 3,
        title: "Mobile App Development",
        provider: "Tech Solutions",
        price: 2500,
        rating: 4.7,
        category: "IT",
        duration: "4 weeks",
        description: "iOS and Android app development",
        available: true
    }
];

// Order Management API methods
export const getOrders = async (filters = {}) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                let filteredOrders = mockOrders;

                if (filters.status) {
                    filteredOrders = filteredOrders.filter(order => order.status === filters.status);
                }
                if (filters.customer) {
                    filteredOrders = filteredOrders.filter(order =>
                        order.customer.toLowerCase().includes(filters.customer.toLowerCase())
                    );
                }

                resolve({ data: filteredOrders });
            }, 300)
        );
    }

    const params = new URLSearchParams(filters);
    return orderService.get(`/orders?${params}`);
};

export const getOrderById = async (orderId) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const order = mockOrders.find(o => o.id === parseInt(orderId));
                resolve({ data: order });
            }, 300)
        );
    }
    return orderService.get(`/orders/${orderId}`);
};

export const createOrder = async (orderData) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const newOrder = {
                    id: Date.now(),
                    ...orderData,
                    status: 'pending',
                    orderDate: new Date().toISOString(),
                    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
                };
                mockOrders.push(newOrder);
                resolve({ data: newOrder });
            }, 300)
        );
    }
    return orderService.post('/orders', orderData);
};

export const updateOrder = async (orderId, updates) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const orderIndex = mockOrders.findIndex(o => o.id === parseInt(orderId));
                if (orderIndex !== -1) {
                    mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...updates };
                    resolve({ data: mockOrders[orderIndex] });
                }
            }, 300)
        );
    }
    return orderService.patch(`/orders/${orderId}`, updates);
};

export const updateOrderStatus = async (orderId, status) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const orderIndex = mockOrders.findIndex(o => o.id === parseInt(orderId));
                if (orderIndex !== -1) {
                    mockOrders[orderIndex].status = status;
                    resolve({ data: mockOrders[orderIndex] });
                }
            }, 300)
        );
    }
    return orderService.patch(`/orders/${orderId}/status`, { status });
};

export const deleteOrder = async (orderId) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const orderIndex = mockOrders.findIndex(o => o.id === parseInt(orderId));
                if (orderIndex !== -1) {
                    mockOrders.splice(orderIndex, 1);
                }
                resolve({ data: { id: orderId } });
            }, 300)
        );
    }
    return orderService.delete(`/orders/${orderId}`);
};

// Service Management API methods
export const getServices = async (filters = {}) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                let filteredServices = mockServices;

                if (filters.category) {
                    filteredServices = filteredServices.filter(service =>
                        service.category === filters.category
                    );
                }
                if (filters.available !== undefined) {
                    filteredServices = filteredServices.filter(service =>
                        service.available === filters.available
                    );
                }

                resolve({ data: filteredServices });
            }, 300)
        );
    }

    const params = new URLSearchParams(filters);
    return orderService.get(`/services?${params}`);
};

export const getServiceById = async (serviceId) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const service = mockServices.find(s => s.id === parseInt(serviceId));
                resolve({ data: service });
            }, 300)
        );
    }
    return orderService.get(`/services/${serviceId}`);
};

export const createService = async (serviceData) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const newService = {
                    id: Date.now(),
                    ...serviceData,
                    createdAt: new Date().toISOString(),
                    available: true
                };
                mockServices.push(newService);
                resolve({ data: newService });
            }, 300)
        );
    }
    return orderService.post('/services', serviceData);
};

export const updateService = async (serviceId, updates) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const serviceIndex = mockServices.findIndex(s => s.id === parseInt(serviceId));
                if (serviceIndex !== -1) {
                    mockServices[serviceIndex] = { ...mockServices[serviceIndex], ...updates };
                    resolve({ data: mockServices[serviceIndex] });
                }
            }, 300)
        );
    }
    return orderService.patch(`/services/${serviceId}`, updates);
};

export const deleteService = async (serviceId) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const serviceIndex = mockServices.findIndex(s => s.id === parseInt(serviceId));
                if (serviceIndex !== -1) {
                    mockServices.splice(serviceIndex, 1);
                }
                resolve({ data: { id: serviceId } });
            }, 300)
        );
    }
    return orderService.delete(`/services/${serviceId}`);
};

// Search functionality
export const searchServices = async (query) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const results = mockServices.filter(service =>
                    service.title.toLowerCase().includes(query.toLowerCase()) ||
                    service.description.toLowerCase().includes(query.toLowerCase()) ||
                    service.provider.toLowerCase().includes(query.toLowerCase())
                );
                resolve({ data: results });
            }, 300)
        );
    }
    return orderService.get(`/services/search?q=${encodeURIComponent(query)}`);
};

export const searchOrders = async (query) => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const results = mockOrders.filter(order =>
                    order.customer.toLowerCase().includes(query.toLowerCase()) ||
                    order.serviceName.toLowerCase().includes(query.toLowerCase()) ||
                    order.provider.toLowerCase().includes(query.toLowerCase())
                );
                resolve({ data: results });
            }, 300)
        );
    }
    return orderService.get(`/orders/search?q=${encodeURIComponent(query)}`);
};

// Statistics and analytics
export const getOrderStatistics = async () => {
    if (process.env.NODE_ENV === 'development') {
        return new Promise(resolve =>
            setTimeout(() => {
                const totalOrders = mockOrders.length;
                const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
                const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
                const inProgressOrders = mockOrders.filter(o => o.status === 'in-progress').length;
                const totalRevenue = mockOrders.reduce((sum, order) => sum + order.price, 0);

                resolve({
                    data: {
                        totalOrders,
                        pendingOrders,
                        completedOrders,
                        inProgressOrders,
                        totalRevenue
                    }
                });
            }, 300)
        );
    }
    return orderService.get('/orders/statistics');
};

// Authentication interceptor
orderService.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
orderService.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle authentication error
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default orderService;