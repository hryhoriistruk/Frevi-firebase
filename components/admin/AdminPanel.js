import { useState, useEffect } from 'react';

export default function AdminPanel() {
    const [complaints, setComplaints] = useState([]);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('/api/admin/complaints').then(res => res.json()),
            fetch('/api/analytics').then(res => res.json())
        ]).then(([comp, anal]) => {
            setComplaints(comp);
            setAnalytics(anal);
        });
    }, []);

    const resolveComplaint = (id) => {
        fetch(`/api/admin/complaints/${id}`, { method: 'PUT' })
            .then(() => setComplaints(complaints.filter(c => c.id !== id)));
    };

    return (
        <div className="admin-panel">
            <h2>Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h3>Recent Complaints</h3>
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.userEmail}</td>
                                <td>{complaint.message}</td>
                                <td>
                                    <button
                                        onClick={() => resolveComplaint(complaint.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Resolve
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Quick Stats</h3>
                    {analytics && (
                        <div className="space-y-4">
                            <div>
                                <p>Total Orders: {analytics.totalOrders}</p>
                                <p>Active Users: {analytics.activeUsers}</p>
                                <p>Revenue: ${analytics.totalRevenue}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}