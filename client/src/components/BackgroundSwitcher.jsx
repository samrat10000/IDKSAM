import React, { useState } from 'react';
import './BackgroundSwitcher.css';

const BackgroundSwitcher = ({ currentBg, setBg, isOpen, setIsOpen }) => {

    const backgrounds = [
        { id: 'dotted-paper', label: 'dotted paper', preview: '/bg-dotted-paper.jpg' },
        { id: 'clouds-hill', label: 'clouds hill', preview: '/bg-clouds-hill.jpg' },
        { id: 'sheep-meadow', label: 'sheep meadow', preview: '/bg-sheep-meadow.jpg' },
        { id: 'fuji-store', label: 'fuji store', preview: '/bg-fuji-store.jpg' },
        { id: 'green-hills', label: 'green hills', preview: '/bg-green-hills.jpg' },
        { id: 'japan-street', label: 'japan street', preview: '/bg-japan-street.jpg' },
        { id: 'flower-sunset', label: 'flower sunset', preview: '/bg-flower-sunset.jpg' },
        { id: 'lush-hills', label: 'lush hills', preview: '/bg-lush-hills.jpg' },
        { id: 'bliss', label: 'bliss', preview: '/bg-bliss.jpg' },
        { id: 'panorama', label: 'panorama', preview: '/bg-panorama.jpg' },
        { id: 'golden-wheat', label: 'golden wheat', preview: '/bg-golden-wheat.jpg' },
        { id: 'city', label: 'city night', preview: '/bg-city.png' },
        { id: 'purple-rain', label: 'purple rain', preview: '/bg-purple-rain.jpg' },
        { id: 'gothic', label: 'gothic garden', preview: '/bg-gothic-roses.jpg' },
        { id: 'mountain-pixel', label: 'pixel peaks', preview: '/bg-mountain-pixel.jpg' },
        { id: 'green-city', label: 'green city', preview: '/bg-green-city.jpg' },
    ];

    return (
        <div className={`bg-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="bg-drawer-content">
                <div className="bg-drawer-title">// background</div>
                <div className="bg-options">
                    {backgrounds.map((b) => (
                        <button
                            key={b.id}
                            className={`bg-btn ${currentBg === b.id ? 'active' : ''}`}
                            onClick={() => {
                                setBg(b.id);
                                window.inosukeSay?.("I AM THE KING OF THIS NEW LAND!!");
                            }}
                            style={{
                                backgroundImage: b.preview.startsWith('/') || b.preview.startsWith('linear') ? b.preview.startsWith('/') ? `url(${b.preview})` : b.preview : 'none',
                                backgroundColor: b.preview.startsWith('#') ? b.preview : 'transparent'
                            }}
                            title={b.label}
                        >
                            <span>{b.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackgroundSwitcher;
