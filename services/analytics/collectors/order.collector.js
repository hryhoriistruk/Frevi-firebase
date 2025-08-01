/**
 * Aggregates order data for dashboards.
 */
class OrderCollector {
    constructor(db) {
        this.db = db; // TimescaleDB connection
    }

    async getOrderStats(startDate, endDate) {
        const query = `
      SELECT status, COUNT(*) 
      FROM orders 
      WHERE created_at BETWEEN $1 AND $2 
      GROUP BY status`;
        return await this.db.query(query, [startDate, endDate]);
    }
}

module.exports = OrderCollector;