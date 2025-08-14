// services/AnalyticsService.js
import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

class AnalyticsService {
    static async getOrderAnalytics() {
        try {
            const ordersRef = collection(db, 'orders');
            const snapshot = await getDocs(ordersRef);

            const totalOrders = snapshot.size;
            const completedOrders = snapshot.docs.filter(doc => doc.data().status === 'completed').length;
            const pendingOrders = snapshot.docs.filter(doc => doc.data().status === 'pending').length;

            // Додаткові дані для графіків (імітація)
            const revenueData = Array.from({ length: 7 }, () =>
                Math.floor(Math.random() * 5000) + 1000
            );

            return {
                totalOrders,
                completedOrders,
                pendingOrders,
                revenueData,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error("Error fetching analytics:", error);
            return null;
        }
    }
}

export default AnalyticsService;