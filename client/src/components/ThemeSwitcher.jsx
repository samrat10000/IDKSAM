import React, { useState } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ currentTheme, setTheme, isOpen, setIsOpen }) => {

    const themes = [
        { id: 'default', label: 'default', color: '#a8a8ff' },
        { id: 'earth', label: 'earth', color: '#9a8c98' },
        { id: 'moss', label: 'moss', color: '#84a59d' },
        { id: 'cherry', label: 'cherry', color: '#ffb7c5' },
        { id: 'lavender', label: 'lavender', color: '#b8a9c9' },
        { id: 'paper', label: 'paper', color: '#f5f0e6' },
        { id: 'ocean', label: 'ocean', color: '#7ec8e3' },
        { id: 'sage', label: 'sage', color: '#a3b18a' },
    ];

    return (
        <div className={`theme-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="theme-drawer-content">
                <div className="theme-drawer-title">// themes</div>
                <div className="theme-options">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            className={`theme-btn ${currentTheme === t.id ? 'active' : ''}`}
                            onClick={() => {
                                setTheme(t.id);
                                window.inosukeSay?.("STOP CHANGING COLORS!! YOU'RE MAKING ME DIZZY!!");
                            }}
                            style={{ backgroundColor: t.color }}
                            title={t.label}
                        >
                            {currentTheme === t.id && <span className="active-dot">●</span>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
