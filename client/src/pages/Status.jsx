import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Status = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/status`)
            .then(res => res.json())
            .then(data => {
                setStatus(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching status:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">connecting...</div>;

    return (
        <div className="status-page-container fade-in">
            <div className="status-content">
                <div className="status-item">
                    <span className="status-label">currently:</span>
                    <span className="status-value">{status?.mood || '...'}</span>
                </div>

                <div className="status-item">
                    <span className="status-label">working on:</span>
                    <span className="status-value">{status?.current_work || '...'}</span>
                </div>

                <div className="status-item">
                    <span className="status-label">listening to:</span>
                    <span className="status-value">{status?.listening || '...'}</span>
                </div>

                <div className="status-item">
                    <span className="status-label">thinking about:</span>
                    <span className="status-value">{status?.thinking_about || '...'}</span>
                </div>

                <div className="status-note-section">
                    <p className="status-note">
                        {status?.note || '// no notes for now.'}
                    </p>
                </div>

                {status?.last_updated && (
                    <div className="status-meta">
                        last updated: {new Date(status.last_updated).toLocaleDateString().toLowerCase()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Status;
