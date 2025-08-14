import { useState, useEffect } from 'react';
import { getComplaints, resolveComplaint } from '../../services/admin';

export default function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'resolved', 'pending'
    const [searchTerm, setSearchTerm] = useState('');

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
            setComplaints(complaints.map(c =>
                c.id === complaintId ? {...c, resolved: true} : c
            ));
        } catch (error) {
            console.error('Error resolving complaint:', error);
        }
    };

    const filteredComplaints = complaints.filter(complaint => {
        // Filter by status
        if (filter === 'resolved' && !complaint.resolved) return false;
        if (filter === 'pending' && complaint.resolved) return false;

        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                complaint.message.toLowerCase().includes(searchLower) ||
                complaint.userName.toLowerCase().includes(searchLower) ||
                complaint.id.toString().includes(searchTerm)
            );
        }

        return true;
    });

    return (
        <div className="admin-dashboard">
            <style jsx>{`
                .admin-dashboard {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                h1 {
                    color: #2c3e50;
                    margin-bottom: 2rem;
                    font-size: 2rem;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 0.5rem;
                }
                
                .controls {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .filter-buttons {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .filter-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                
                .filter-btn.active {
                    background-color: #3498db;
                    color: white;
                }
                
                .filter-btn:not(.active) {
                    background-color: #ecf0f1;
                    color: #7f8c8d;
                }
                
                .search-input {
                    padding: 0.5rem 1rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    min-width: 250px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }
                
                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #ecf0f1;
                }
                
                th {
                    background-color: #3498db;
                    color: white;
                    font-weight: 500;
                }
                
                tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                
                tr:hover {
                    background-color: #f1f7fd;
                }
                
                .status {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .status-pending {
                    background-color: #fff3cd;
                    color: #856404;
                }
                
                .status-resolved {
                    background-color: #d4edda;
                    color: #155724;
                }
                
                .resolve-btn {
                    padding: 0.5rem 1rem;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .resolve-btn:hover {
                    background-color: #218838;
                }
                
                .loading {
                    text-align: center;
                    padding: 2rem;
                    color: #7f8c8d;
                }
                
                .no-complaints {
                    text-align: center;
                    padding: 2rem;
                    color: #7f8c8d;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                    margin-top: 1rem;
                }
                
                @media (max-width: 768px) {
                    table {
                        display: block;
                        overflow-x: auto;
                    }
                    
                    .controls {
                        flex-direction: column;
                    }
                    
                    .filter-buttons {
                        justify-content: center;
                    }
                }
            `}</style>

            <h1>Admin Dashboard</h1>

            <div className="controls">
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
                        onClick={() => setFilter('resolved')}
                    >
                        Resolved
                    </button>
                </div>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="complaints-list">
                <h2>Complaints</h2>
                {isLoading ? (
                    <p className="loading">Loading complaints...</p>
                ) : filteredComplaints.length === 0 ? (
                    <p className="no-complaints">No complaints found</p>
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
                        {filteredComplaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.userName}</td>
                                <td>{complaint.message}</td>
                                <td>
                                        <span className={`status status-${complaint.resolved ? 'resolved' : 'pending'}`}>
                                            {complaint.resolved ? 'Resolved' : 'Pending'}
                                        </span>
                                </td>
                                <td>
                                    {!complaint.resolved && (
                                        <button
                                            className="resolve-btn"
                                            onClick={() => handleResolve(complaint.id)}
                                        >
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