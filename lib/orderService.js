// Mock services with sample orders
const mockServices = [
    {
        name: "Home Repair",
        description: "Plumbing, electrical work, and general home maintenance",
        orders: [
            {
                customerName: "Michael Johnson",
                serviceDetails: "Fix leaking kitchen sink",
                totalAmount: 1200,
                status: "pending",
                createdAt: new Date().toISOString()
            },
            {
                customerName: "Sarah Brown",
                serviceDetails: "Replace bathroom tiles",
                totalAmount: 3500,
                status: "processing",
                createdAt: new Date().toISOString()
            }
        ]
    },
    {
        name: "Cleaning Service",
        description: "Deep cleaning, office cleaning, and window washing",
        orders: [
            {
                customerName: "David Wilson",
                serviceDetails: "Deep clean 3-room apartment",
                totalAmount: 900,
                status: "completed",
                createdAt: new Date(Date.now() - 86400000).toISOString() // yesterday
            },
            {
                customerName: "Emily Davis",
                serviceDetails: "Office cleaning (200 m²)",
                totalAmount: 2500,
                status: "cancelled",
                createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            }
        ]
    },
    {
        name: "Moving Service",
        description: "Local and long-distance moving with packing",
        orders: [
            {
                customerName: "Robert Miller",
                serviceDetails: "Move 2-bedroom apartment across town",
                totalAmount: 5000,
                status: "pending",
                createdAt: new Date().toISOString()
            }
        ]
    }
];

// Get all services
export const getServices = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            data: mockServices,
            success: true,
            total: mockServices.length
        }), 100);
    });
};

// Get orders for a specific service
export const getOrdersByService = async (serviceName) => {
    return new Promise((resolve) => {
        const service = mockServices.find(s => s.name === serviceName);
        setTimeout(() => resolve({
            data: service ? service.orders : [],
            success: !!service
        }), 100);
    });
};

// Add an order to a service
export const addOrderToService = async (serviceName, orderData) => {
    return new Promise((resolve) => {
        const service = mockServices.find(s => s.name === serviceName);
        if (service) {
            service.orders.push({
                ...orderData,
                createdAt: new Date().toISOString()
            });
            resolve({ success: true });
        } else {
            resolve({ success: false, message: "Service not found" });
        }
    });
};

// Update an order for a service
export const updateOrderInService = async (serviceName, index, updates) => {
    return new Promise((resolve) => {
        const service = mockServices.find(s => s.name === serviceName);
        if (service && service.orders[index]) {
            service.orders[index] = {
                ...service.orders[index],
                ...updates
            };
            resolve({ success: true });
        } else {
            resolve({ success: false, message: "Order not found" });
        }
    });
};

// Delete an order from a service
export const deleteOrderFromService = async (serviceName, index) => {
    return new Promise((resolve) => {
        const service = mockServices.find(s => s.name === serviceName);
        if (service && service.orders[index]) {
            service.orders.splice(index, 1);
            resolve({ success: true });
        } else {
            resolve({ success: false, message: "Order not found" });
        }
    });
};

// Default export
const serviceManager = {
    getServices,
    getOrdersByService,
    addOrderToService,
    updateOrderInService,
    deleteOrderFromService
};

export default serviceManager;
