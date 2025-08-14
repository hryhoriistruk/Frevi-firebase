import styles from '../../styles/Services.module.css';

export default function AnalyticsDashboard({ orders, finances }) {
    return (
        <div className={styles.dashboard}>
            <div className={styles.card}>
                <h3>📊 Total Orders</h3>
                <p>{orders?.totalOrders || 0}</p>
            </div>
            <div className={styles.card}>
                <h3>✅ Completed</h3>
                <p>{orders?.completedOrders || 0}</p>
            </div>
            <div className={styles.card}>
                <h3>⏳ Pending</h3>
                <p>{orders?.pendingOrders || 0}</p>
            </div>
            <div className={styles.card}>
                <h3>💰 Total Revenue</h3>
                <p>${finances?.totalRevenue?.toFixed(2) || 0}</p>
            </div>
        </div>
    );
}