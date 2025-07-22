// Complete orderService with all required exports

// Mock data for static export
const mockOrders = [
    {
        id: 1,
        customerName: "Іван Петров",
        items: "2x Піца Маргарита",
        total: 350,
        status: "готується",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        customerName: "Марія Іваненко",
        items: "1x Бургер, 1x Кола",
        total: 180,
        status: "доставляється",
        createdAt: new Date().toISOString()
    }
];

// Export individual functions
export const getOrders = async () => {
    // For static export, return mock data
    // In real app, this would be an API call
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockOrders), 100);
    });
};

export const deleteOrder = async (orderId) => {
    // For static export, simulate deletion
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Order ${orderId} deleted`);
            resolve({ success: true, id: orderId });
        }, 100);
    });
};

export const createOrder = async (orderData) => {
    // For static export, simulate creation
    return new Promise((resolve) => {
        const newOrder = {
            id: Date.now(),
            ...orderData,
            createdAt: new Date().toISOString()
        };
        setTimeout(() => resolve(newOrder), 100);
    });
};

export const updateOrder = async (orderId, updates) => {
    // For static export, simulate update
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: orderId, ...updates });
        }, 100);
    });
};

// Default export
const orderService = {
    getOrders,
    deleteOrder,
    createOrder,
    updateOrder
};

export default orderService;