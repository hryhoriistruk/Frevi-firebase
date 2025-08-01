// services/analytics/orderStats.js
class OrderAnalytics {
    static async getDailyStats(date) {
        return Order.aggregate([
            { $match: { createdAt: { $gte: date } } },
            { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    total: { $sum: "$amount" }
                }}
        ]);
    }
}