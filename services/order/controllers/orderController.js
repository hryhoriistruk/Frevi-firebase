const Order = require('../models/Order');
const ProductService = require('../../product/services/productService');
const UserService = require('../../user/services/userService');
const { validateOrderData } = require('../validators/orderValidator');
const { logError, logInfo } = require('../../../utils/logger');

class OrderController {
    // Створення нового замовлення
    async createOrder(req, res) {
        try {
            const { error } = validateOrderData(req.body);
            if (error) {
                logError('Order validation failed', error.details);
                return res.status(400).json({ message: error.details[0].message });
            }

            const { userId, products, totalAmount } = req.body;

            // Перевірка наявності користувача
            const userExists = await UserService.userExists(userId);
            if (!userExists) {
                logError(`User not found: ${userId}`);
                return res.status(404).json({ message: 'User not found' });
            }

            // Перевірка наявності продуктів
            const productsAvailable = await ProductService.checkProductsAvailability(products);
            if (!productsAvailable) {
                logError('One or more products not available', products);
                return res.status(400).json({ message: 'One or more products not available' });
            }

            // Створення замовлення
            const newOrder = new Order({
                userId,
                products,
                totalAmount,
                status: 'pending',
                createdAt: new Date()
            });

            await newOrder.save();

            // Оновлення запасів продуктів
            await ProductService.updateProductStocks(products);

            logInfo('Order created successfully', { orderId: newOrder._id });
            res.status(201).json(newOrder);
        } catch (error) {
            logError('Error creating order', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Отримання замовлення за ID
    async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            logError('Error fetching order', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Оновлення статусу замовлення
    async updateOrderStatus(req, res) {
        try {
            const { status } = req.body;
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            logInfo('Order status updated', { orderId: updatedOrder._id, status });
            res.json(updatedOrder);
        } catch (error) {
            logError('Error updating order status', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Отримання замовлень користувача
    async getUserOrders(req, res) {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            res.json(orders);
        } catch (error) {
            logError('Error fetching user orders', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Скасування замовлення
    async cancelOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.status === 'cancelled') {
                return res.status(400).json({ message: 'Order already cancelled' });
            }

            if (order.status === 'delivered') {
                return res.status(400).json({ message: 'Cannot cancel delivered order' });
            }

            order.status = 'cancelled';
            await order.save();

            // Повернення продуктів у запас
            await ProductService.restoreProductStocks(order.products);

            logInfo('Order cancelled', { orderId: order._id });
            res.json(order);
        } catch (error) {
            logError('Error cancelling order', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new OrderController();