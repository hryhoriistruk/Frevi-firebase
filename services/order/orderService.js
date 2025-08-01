// services/order/orderService.js
async function getOrders(page = 1, limit = 10) {
    return Order.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .cache({ key: `orders:page:${page}` });
}