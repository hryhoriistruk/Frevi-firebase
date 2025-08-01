// services/analytics/cacheService.js
class AnalyticsCache {
    constructor() {
        this.prefix = 'analytics_';
    }

    async getReport(reportName, params) {
        const key = `${this.prefix}${reportName}_${hashParams(params)}`;
        const cached = await redis.get(key);
        if (cached) return JSON.parse(cached);

        const data = await generateReport(reportName, params);
        await redis.setex(key, 3600, JSON.stringify(data)); // Cache for 1h
        return data;
    }
}