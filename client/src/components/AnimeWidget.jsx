import React, { useState } from 'react';
import './AnimeWidget.css';

const AnimeWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Top anime picks with YouTube trailer links
    const animes = [
        { id: 1, name: 'Naruto', link: 'https://youtu.be/-G9BqkgZXRA?si=XpyP2n3SIbuxXAAb' },
        { id: 2, name: 'One Punch Man', link: 'https://youtu.be/Poo5lqoWSGw?si=1jJ5HLa6v4aLNuGP' },
        { id: 3, name: 'Dr. Stone', link: 'https://youtu.be/aqAw1rilA24?si=aUH8lcwRXhHOtCA-' },
    ];

    return (
        <div className={`anime-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="anime-drawer-content">
                <h3 className="anime-drawer-title">🎌 my anime</h3>
                <div className="anime-list">
                    {animes.map(anime => (
                        <div key={anime.id} className="anime-item">
                            <a
                                href={anime.link}
                                className="anime-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {anime.name}
                            </a>
                            <span className="noob-bubble">
                                haven't seen this?? you're such a noob lol 😂
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="anime-drawer-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                ANIME
            </button>
        </div>
    );
};

export default AnimeWidget;
