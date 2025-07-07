import axios from 'axios';

const orderService = axios.create({
    baseURL: 'http://localhost:9191', // URL OrderService
});


export const getOrders = () => orderService.get('/orders');
export const getOrderById = (id) => orderService.get(`/orders/${id}`);
export const createOrder = (data) => orderService.post('/orders', data);
export const updateOrder = (id, data) => orderService.put(`/orders/${id}`, data);
export const deleteOrder = (id) => orderService.delete(`/orders/${id}`);
export const cancelOrder = (id) => orderService.patch(`/orders/${id}/cancel`);