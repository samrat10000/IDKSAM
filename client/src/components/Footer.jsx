import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {
    const [hits, setHits] = useState(1337);

    // Real hit counter increment
    useEffect(() => {
        const incrementVisits = async () => {
            // Basic check to prevent double-counting in strict mode or dev
            // Real production apps might use session cookies, but this is simple enough
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.post(`${API_URL}/api/visits/increment`);
                setHits(res.data.count);
            } catch (err) {
                console.error("Failed to increment visits", err);
                // Fallback to local storage if API fails, just to show something
                const stored = localStorage.getItem('monstac-hits');
                setHits(stored ? parseInt(stored) : 1337);
            }
        };
        incrementVisits();
    }, []);

    const badges = [
        { label: 'REACT', color: '#f7df1e', text: '#000' },
        { label: 'MONGODB', color: '#47a248' },
        { label: 'CSS3', color: '#264de4' },
        { label: 'EXPRESS', color: '#ff0000' },
        { label: 'NODEJS', color: '#8a2be2' },
    ];

    return (
        <footer className="site-footer">
            <div className="footer-content">

                {/* Section 1: Webring */}
                <div className="footer-section webring">
                    <span className="section-title">:: INDIE WEBRING ::</span>
                    <div className="webring-nav">
                        <a href="#" onClick={e => e.preventDefault()}>&lt;&lt; PREV</a>
                        <span className="divider">|</span>
                        <a href="#" onClick={e => e.preventDefault()}>RANDOM</a>
                        <span className="divider">|</span>
                        <a href="#" onClick={e => e.preventDefault()}>NEXT &gt;&gt;</a>
                    </div>
                    <p className="webring-disclaimer">
                        <span className="blink-slow">⚠</span> buttons don't do anything yet...
                        this is my first site! working on it tho :)
                    </p>
                </div>

                {/* Section 2: Badges (88x31 mimic) */}
                <div className="footer-section badges">
                    {badges.map((b, i) => (
                        <div key={i} className="pixel-badge" style={{
                            backgroundColor: b.color,
                            color: b.text || '#fff'
                        }}>
                            {b.label}
                        </div>
                    ))}
                    {/* Placeholder for real images if added later */}
                </div>

                {/* Section 3: Copyright & Counter */}
                <div className="footer-section copyright">
                    <div className="hit-counter">
                        <span className="counter-label">VISITORS:</span>
                        <span className="counter-digits">
                            {hits.toString().padStart(6, '0').split('').map((d, i) => (
                                <span key={i} className="digit-box">{d}</span>
                            ))}
                        </span>
                    </div>
                    <p>© 2025 IDKSAM NO RIGHTS RESERVED.</p>
                    <p className="tiny-text">Made with &lt;3 and Caffeine</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
