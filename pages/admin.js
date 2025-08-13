import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Head from "next/head";
import { FiSearch, FiTrash2, FiUser, FiMail, FiKey, FiCheck, FiUsers } from "react-icons/fi";
import styles from "../styles/Admin.module.css";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeToday: 0,
        withProfile: 0
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setUsers(usersList);
                setStats({
                    totalUsers: usersList.length,
                    activeToday: usersList.filter(u => {
                        const lastActive = u.lastActive?.toDate();
                        return lastActive && isToday(lastActive);
                    }).length,
                    withProfile: usersList.filter(u => u.displayName).length
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users: ", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const handleDelete = async (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteDoc(doc(db, "users", userId));
                setUsers(users.filter((user) => user.id !== userId));
                setStats(prev => ({...prev, totalUsers: prev.totalUsers - 1}));
            } catch (error) {
                console.error("Error deleting user: ", error);
            }
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(filteredUsers.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return;

        if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
            try {
                await Promise.all(
                    selectedUsers.map((userId) => deleteDoc(doc(db, "users", userId)))
                );
                setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
                setSelectedUsers([]);
                setStats(prev => ({...prev, totalUsers: prev.totalUsers - selectedUsers.length}));
            } catch (error) {
                console.error("Error deleting users: ", error);
            }
        }
    };

    const filteredUsers = users.filter((user) =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.adminContainer}>
            <Head>
                <title>Admin Dashboard | Frevi</title>
                <meta name="description" content="Frevi Admin Dashboard" />
            </Head>

            <aside className={styles.sidebar}>
                <div className={styles.logo}>Frevi Admin</div>
                <nav className={styles.nav}>
                    <a href="#" className={styles.active}><FiUsers /> Users</a>
                    <a href="#"><FiUser /> Profile</a>
                    <a href="#"><FiMail /> Messages</a>
                    <a href="#"><FiKey /> Settings</a>
                </nav>
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>User Management</h1>
                    <div className={styles.actions}>
                        {selectedUsers.length > 0 && (
                            <button onClick={handleBulkDelete} className={styles.dangerButton}>
                                <FiTrash2 /> Delete Selected ({selectedUsers.length})
                            </button>
                        )}
                    </div>
                </header>

                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.totalUsers}</div>
                        <div className={styles.statLabel}>Total Users</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.activeToday}</div>
                        <div className={styles.statLabel}>Active Today</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.withProfile}</div>
                        <div className={styles.statLabel}>With Profile</div>
                    </div>
                </div>

                <div className={styles.searchBar}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search users by email or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {loading ? (
                    <div className={styles.loader}>
                        <div className={styles.spinner}></div>
                        Loading users...
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.usersTable}>
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className={styles.userRow}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td>
                                            <div className={styles.userInfo}>
                                                <div className={styles.avatar}>
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.displayName} />
                                                    ) : (
                                                        <FiUser />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className={styles.userName}>
                                                        {user.displayName || "Anonymous"}
                                                    </div>
                                                    <div className={styles.userId}>{user.id.substring(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email || "No email"}</td>
                                        <td>
                        <span className={`${styles.status} ${user.emailVerified ? styles.verified : styles.unverified}`}>
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className={styles.deleteButton}
                                                title="Delete user"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className={styles.noResults}>
                                        No users found matching your search
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}