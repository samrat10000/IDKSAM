import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalPosts: 0,
        publishedPosts: 0,
        pendingGuestbook: 0,
        totalVisits: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch blog posts
                const blogRes = await fetch(`${API_URL}/api/admin/blog`, { headers });
                const posts = await blogRes.json();

                // Fetch guestbook entries
                const guestbookRes = await fetch(`${API_URL}/api/admin/guestbook`, { headers });
                const entries = await guestbookRes.json();

                // Fetch visits
                const visitsRes = await fetch(`${API_URL}/api/visits`);
                const visits = await visitsRes.json();

                setStats({
                    totalPosts: posts.length,
                    publishedPosts: posts.filter(p => p.published).length,
                    pendingGuestbook: entries.filter(e => !e.approved).length,
                    totalVisits: visits.count || 0
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading">loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>// admin dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">logout →</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.totalPosts}</div>
                    <div className="stat-label">total blog posts</div>
                    <div className="stat-detail">{stats.publishedPosts} published</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{stats.pendingGuestbook}</div>
                    <div className="stat-label">pending guestbook</div>
                    <div className="stat-detail">awaiting approval</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{stats.totalVisits}</div>
                    <div className="stat-label">total visits</div>
                    <div className="stat-detail">site counter</div>
                </div>
            </div>

            <div className="admin-actions">
                <h2>quick actions</h2>
                <div className="actions-grid">
                    <Link to="/admin/blog" className="action-btn">
                        <span className="action-icon">📝</span>
                        <span>manage blog posts</span>
                    </Link>

                    <Link to="/admin/guestbook" className="action-btn">
                        <span className="action-icon">💬</span>
                        <span>manage guestbook</span>
                    </Link>

                    <a href="/" className="action-btn">
                        <span className="action-icon">🏠</span>
                        <span>view site</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
