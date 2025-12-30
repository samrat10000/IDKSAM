import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Use shared admin styles

const AdminGuestbook = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchEntries();
    }, [token, navigate]);

    const fetchEntries = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/guestbook', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setEntries(data);
        } catch (err) {
            console.error('Error fetching guestbook:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/admin/guestbook/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchEntries(); // Refresh list
        } catch (err) {
            console.error('Error approving:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry forever?')) return;
        try {
            await fetch(`http://localhost:5000/api/admin/guestbook/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchEntries();
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    if (loading) return <div className="admin-dashboard"><div className="loading">loading entries...</div></div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="header-left">
                    <button onClick={() => navigate('/admin/dashboard')} className="back-btn">← dashboard</button>
                    <h1>// moderate guestbook</h1>
                </div>
            </div>

            <div className="guestbook-admin-list">
                {entries.length === 0 ? <p className="empty-state">no entries found.</p> : (
                    entries.map(entry => (
                        <div key={entry._id} className={`admin-entry-card ${entry.approved ? 'approved' : 'pending'}`}>
                            <div className="entry-meta">
                                <span className={`status-badge ${entry.approved ? 'status-live' : 'status-pending'}`}>
                                    {entry.approved ? 'LIVE' : 'PENDING'}
                                </span>
                                <span className="entry-time">{new Date(entry.createdAt).toLocaleString()}</span>
                            </div>

                            <div className="entry-content">
                                <div className="entry-sender">
                                    <span className="sender-stamp">{entry.stamp}</span>
                                    <strong>{entry.name}</strong>
                                </div>
                                <p className="entry-message">{entry.message}</p>
                            </div>

                            <div className="entry-actions">
                                {!entry.approved && (
                                    <button onClick={() => handleApprove(entry._id)} className="action-btn-sm approve-btn">
                                        ✓ approve
                                    </button>
                                )}
                                <button onClick={() => handleDelete(entry._id)} className="action-btn-sm delete-btn">
                                    🗑 delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
                .header-left { display: flex; align-items: center; gap: 1rem; }
                .back-btn { background: none; border: none; color: var(--accent); cursor: pointer; font-family: var(--font-pixel); }
                .guestbook-admin-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
                .admin-entry-card { background: rgba(255,255,255,0.05); padding: 1.5rem; border: 1px solid #333; }
                .admin-entry-card.pending { border-left: 4px solid #ffd700; }
                .admin-entry-card.approved { border-left: 4px solid #4caf50; }
                .entry-meta { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.8rem; color: #888; }
                .status-badge { padding: 2px 6px; border-radius: 4px; color: #000; font-weight: bold; }
                .status-pending { background: #ffd700; }
                .status-live { background: #4caf50; }
                .entry-sender { display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem; color: var(--accent); }
                .entry-message { font-family: var(--font-typewriter); color: #ddd; white-space: pre-wrap; }
                .entry-actions { display: flex; gap: 1rem; margin-top: 1rem; justify-content: flex-end; }
                .action-btn-sm { padding: 0.5rem 1rem; cursor: pointer; font-family: var(--font-pixel); border: none; }
                .approve-btn { background: #4caf50; color: #fff; }
                .delete-btn { background: #f44336; color: #fff; }
            `}</style>
        </div>
    );
};

export default AdminGuestbook;
