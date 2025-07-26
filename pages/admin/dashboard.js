import { useState, useEffect } from 'react';
import { getComplaints, resolveComplaint } from '../../services/admin';

export default function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await getComplaints();
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const handleResolve = async (complaintId) => {
        try {
            await resolveComplaint(complaintId);
            setComplaints(complaints.filter(c => c.id !== complaintId));
        } catch (error) {
            console.error('Error resolving complaint:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="complaints-list">
                <h2>Complaints</h2>
                {isLoading ? (
                    <p>Loading complaints...</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.userName}</td>
                                <td>{complaint.message}</td>
                                <td>{complaint.resolved ? 'Resolved' : 'Pending'}</td>
                                <td>
                                    {!complaint.resolved && (
                                        <button onClick={() => handleResolve(complaint.id)}>
                                            Resolve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}