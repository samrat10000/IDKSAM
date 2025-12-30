import React, { useState, useEffect } from 'react';
import './SiteStatsWidget.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SiteStatsWidget = () => {
    const [visits, setVisits] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const res = await fetch(`${API_URL}/api/visits`);
                const data = await res.json();
                setVisits(data.count);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchVisits();
    }, []);

    const createdDate = "3/26/2024";
    const updatedDate = "...";

    return (
        <div className={`stats-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="stats-drawer-content">
                <div className="widget-header">
                    <span className="widget-icon">[|||]</span>
                    <span className="widget-title">site stats!</span>
                </div>
                <div className="stats-content">
                    <div className="stat-row">
                        <span className="stat-label">created:</span>
                        <span className="stat-value">{createdDate}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">updated:</span>
                        <span className="stat-value">{updatedDate}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">visits:</span>
                        <span className="stat-value">{visits}</span>
                    </div>
                </div>
            </div>
            <button
                className="stats-drawer-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Close stats" : "Open stats"}
            >
                <span>stats</span>
            </button>
        </div>
    );
};

export default SiteStatsWidget;
