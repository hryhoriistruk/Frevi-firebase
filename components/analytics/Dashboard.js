import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <div>Loading analytics...</div>;

    return (
        <div className="analytics-dashboard">
            <h2>Platform Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3>Orders by Status</h3>
                    <Pie data={{
                        labels: Object.keys(stats.orderStatus),
                        datasets: [{
                            data: Object.values(stats.orderStatus),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                        }]
                    }} />
                </div>

                <div>
                    <h3>Revenue Last 30 Days</h3>
                    <Bar data={{
                        labels: stats.revenueByDate.map(d => d.date),
                        datasets: [{
                            label: 'Revenue',
                            data: stats.revenueByDate.map(d => d.amount),
                            backgroundColor: '#4BC0C0'
                        }]
                    }} />
                </div>
            </div>
        </div>
    );
}