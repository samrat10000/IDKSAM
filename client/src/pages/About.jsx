import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/about`)
            .then(res => res.json())
            .then(val => setAboutData(val))
            .catch(err => console.error(err));
    }, []);

    if (!aboutData) return <div className="loading">Loading identity...</div>;

    return (
        <React.Fragment>
            <h1 className="pixel-title">The Webmaster</h1>

            <div className="id-card-layout">
                <div className="avatar-section">
                    <div className="avatar-frame" style={{ position: 'relative' }}>
                        <img src="/avatar-mimikyu.jpg" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="avatar-placeholder" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>[NO SIGNAL]</div>
                    </div>
                    <div className="identity-badge">LVL 23 Digital Nomad</div>
                </div>

                <div className="info-section">
                    <div className="bio-block">
                        <h3 className="section-label">// BIOGRAPHY</h3>
                        <p className="bio-text">{aboutData.bio}</p>
                    </div>

                    <div className="stats-block">
                        <h3 className="section-label">// STATS</h3>
                        <div className="stats-grid">
                            <div className="stat-item">STR: {aboutData.stats.str}</div>
                            <div className="stat-item">DEX: {aboutData.stats.dex}</div>
                            <div className="stat-item">INT: {aboutData.stats.int}</div>
                            <div className="stat-item">LCK: {aboutData.stats.lck}</div>
                        </div>
                    </div>

                    <div className="interests-block">
                        <h3 className="section-label">// INTERESTS</h3>
                        <ul className="interests-list">
                            <li>{'>'} Bikes</li>
                            <li>{'>'} Calisthenia</li>
                            <li>{'>'} Anime</li>
                            <li>{'>'} Retro computing</li>
                            <li>{'>'} Exploring music</li>
                            <li>{'>'} Pixel art</li>
                            <li>{'>'} Indie games</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="back-link">
                <Link to="/">[← return to home]</Link>
            </div>
        </React.Fragment>
    );
};

export default About;
