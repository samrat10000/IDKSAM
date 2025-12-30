import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Scrapbook = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/scrapbook`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching scrapbook:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">loading memories...</div>;

    return (
        <div className="scrapbook-page">
            <div className="scrapbook-board-header">
                <div className="content-header">
                    <h1 className="glitch-text" data-text="Digital Scrapbook">Digital Scrapbook</h1>
                    <div className="typing-text">a collection of thoughts and moments.</div>
                </div>
                <div className="scrapbook-actions-top">
                    {/* Add any future scrapbook actions here */}
                </div>
            </div>

            <div className="scrapbook-canvas">
                {items.map((item, index) => (
                    <div
                        key={item._id || index}
                        className={`scrapbook-item item-${item.type}`}
                        style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            transform: `rotate(${item.rotation}deg)`
                        }}
                    >
                        {item.type === 'image' ? (
                            <div className="polaroid-frame">
                                <img src={item.content} alt={item.caption || "memory"} />
                                <div className="polaroid-caption">{item.caption || "moment captured."}</div>
                                <div className="tape tape-top"></div>
                            </div>
                        ) : item.type === 'note' ? (
                            <div className="sticky-note">
                                {item.content}
                            </div>
                        ) : (
                            <div className="sticker-item">
                                {item.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="scrapbook-footer">
                // this is a living document.
            </div>
        </div>
    );
};

export default Scrapbook;
