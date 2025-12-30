import React, { useState, useEffect } from 'react';
import MegumiMascot from '../components/MegumiMascot';
import './Guestbook.css';

// Indie/Kaomoji Stamps instead of generic emojis
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({ name: '', message: '', website: '' });
    const [status, setStatus] = useState('');

    const stamps = [
        '(^_^)',
        '(>_<)',
        '(¬_¬)',
        '(ToT)',
        '(*_*)',
        '(OoO)',
        '(^o^)/',
        '<3'
    ];

    useEffect(() => {
        fetch(`${API_URL}/api/guestbook`)
            .then(res => res.json())
            .then(data => setEntries(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/api/guestbook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                setStatus('signal transmitted... 📡');
                setFormData({ name: '', message: '', stamp: '(^_^)' });
            });
    };

    return (
        <div className="guestbook-page fade-in">
            <div className="content-header">
                <h1 className="pixel-title">Guestbook</h1>
                <p className="typing-text">// drop a signal in the void...</p>
            </div>

            <div className="guestbook-layout">
                {/* Form Section - Styled like a terminal input */}
                <div className="guestbook-input-section">
                    <h3 className="section-label">:: NEW SIGNAL ::</h3>
                    <form className="guestbook-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>&gt; SENDER_ID:</label>
                            <input
                                type="text"
                                placeholder="anon"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                maxLength="20"
                            />
                        </div>
                        <div className="form-group">
                            <label>&gt; EMOTE_PACKET:</label>
                            <div className="kaomoji-grid">
                                {stamps.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`kaomoji-btn ${formData.stamp === s ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, stamp: s })}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>&gt; DATA_PAYLOAD:</label>
                            <textarea
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows="4"
                                placeholder="..."
                            ></textarea>
                        </div>
                        <button type="submit" className="retro-submit-btn">[ TRANSMIT ]</button>
                        {status && <p className="status-msg">{status}</p>}
                    </form>
                </div>

                {/* Wall Section - Styled like a BBS log */}
                <div className="guestbook-wall">
                    <h3 className="section-label">:: INCOMING SIGNALS ::</h3>
                    {entries.length === 0 ? (
                        <p className="empty-msg">// no signals received yet.</p>
                    ) : (
                        <div className="bbs-log">
                            {entries.map(entry => (
                                <div key={entry._id} className="bbs-entry">
                                    <div className="bbs-header">
                                        <span className="bbs-id">#{entry._id?.slice(-4) || '0000'}</span>
                                        <span className="bbs-timestamp">[{new Date(entry.createdAt).toLocaleDateString()}]</span>
                                        <span className="bbs-user">@{entry.name}</span>
                                        <span className="bbs-emote">{entry.stamp || '(^_^)'}</span>
                                    </div>
                                    <div className="bbs-message">
                                        &gt; {entry.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <MegumiMascot />
        </div>
    );
};

export default Guestbook;
