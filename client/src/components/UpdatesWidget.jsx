import React, { useState } from 'react';
import updatesData from '../data/updates.json';
import './UpdatesWidget.css';

const UpdatesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`updates-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="updates-drawer-content">
                <div className="widget-header">
                    <span className="widget-icon">V1.2</span>
                    <span className="widget-title">updates!</span>
                </div>
                <div className="updates-list">
                    {updatesData.map((update, index) => (
                        <div key={index} className="update-item">
                            <div className="update-date">{update.date}:</div>
                            <div className="update-text">
                                {update.content} {update.icon && <span className="update-icon">{update.icon}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="updates-drawer-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Close updates" : "Open updates"}
            >
                <span>updates</span>
            </button>
        </div>
    );
};

export default UpdatesWidget;
