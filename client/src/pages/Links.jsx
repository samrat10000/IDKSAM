import React, { useState, useEffect } from 'react';
import ItadoriMascot from '../components/ItadoriMascot';
import './Links.css';

const Links = () => {
    const connections = [
        { title: "Portfolio", url: "https://samrat-portfolio-2024-8huu.onrender.com", desc: "My digital home base." },
        { title: "LinkedIn", url: "https://www.linkedin.com/in/samrat-dutta-6a017524a/", desc: "Professional graph node." },
        { title: "GitHub", url: "https://github.com/samrat10000", desc: "Where code lives." },
        { title: "Email", url: "mailto:samratrex999@gmail.com", desc: "Signal frequency." },
        { title: "Playlist", url: "https://music.youtube.com/playlist?list=PLKxt3aIEpQWQDk5pPZyXjUMe_opfnhrsz", desc: "My vibes." }
    ];

    const webrings = [
        { title: "Faeraphim", url: "https://faeraphim.net/", desc: "Ethereal aesthetics." },
        { title: "Pollygon", url: "https://pollygon.dev/", desc: "Low-poly thoughts." },
        { title: "Human Finny", url: "https://humanfinny.neocities.org/", desc: "Neocities neighbor." },
        { title: "Lejlart", url: "https://www.lejlart.com/apple.html", desc: "Digital orchard." }
    ];

    return (
        <div className="links-container fade-in">
            <h1 className="pixel-title">Network</h1>
            <p className="typing-text">// "Where do we go from here?"</p>

            {/* Connections Section */}
            <div className="link-category-section">
                <h3 className="section-label" style={{ marginTop: '2rem' }}>// CONNECTIONS</h3>
                <div className="links-grid">
                    {connections.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-card">
                            <div className="link-btn-img-container">
                                {/* Custom CSS Badges based on title */}
                                {link.title === 'Portfolio' && (
                                    <div className="pixel-badge-custom portfolio">
                                        <span className="badge-icon">★</span>
                                        <span className="badge-text">MY_WORK</span>
                                    </div>
                                )}
                                {link.title === 'LinkedIn' && (
                                    <div className="pixel-badge-custom linkedin">
                                        {/* Icon removed as per request */}
                                        <span className="badge-text">LINKEDIN</span>
                                    </div>
                                )}
                                {link.title === 'GitHub' && (
                                    <div className="pixel-badge-custom github">
                                        <span className="badge-icon">git</span>
                                        <span className="badge-text">HUB</span>
                                    </div>
                                )}
                                {link.title === 'Email' && (
                                    <div className="pixel-badge-custom email">
                                        <span className="badge-icon">✉</span>
                                        <span className="badge-text">MAIL_ME</span>
                                    </div>
                                )}
                                {link.title === 'Playlist' && (
                                    <div className="pixel-badge-custom playlist">
                                        <span className="badge-icon">♫</span>
                                        <span className="badge-text">MY_MIX</span>
                                    </div>
                                )}
                            </div>
                            <div className="link-info">
                                <span className="link-title">{link.title}</span>
                                <span className="link-desc">{link.desc}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Webrings Section */}
            <div className="link-category-section">
                <h3 className="section-label" style={{ marginTop: '2rem' }}>// WEBRINGS</h3>
                <div className="links-grid">
                    {webrings.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-card">
                            <div className="link-btn-img-container">
                                {/* Custom Webring Badges */}
                                {link.title === 'Faeraphim' && (
                                    <div className="pixel-badge-custom faeraphim">
                                        <span className="badge-icon">✧</span>
                                        <span className="badge-text">FAERA</span>
                                    </div>
                                )}
                                {link.title === 'Pollygon' && (
                                    <div className="pixel-badge-custom pollygon">
                                        <span className="badge-icon">▲</span>
                                        <span className="badge-text">POLLY</span>
                                    </div>
                                )}
                                {link.title === 'Human Finny' && (
                                    <div className="pixel-badge-custom finny">
                                        <span className="badge-icon">☺</span>
                                        <span className="badge-text">FINNY</span>
                                    </div>
                                )}
                                {link.title === 'Lejlart' && (
                                    <div className="pixel-badge-custom lejlart">
                                        <span className="badge-icon">🍎</span>
                                        <span className="badge-text">LEJL</span>
                                    </div>
                                )}
                            </div>
                            <div className="link-info">
                                <span className="link-title">{link.title}</span>
                                <span className="link-desc">{link.desc}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <ItadoriMascot />
        </div>
    );
};

export default Links;
