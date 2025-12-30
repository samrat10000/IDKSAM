import React, { useState, useEffect } from 'react';
import './Stickers.css';

const ALL_STICKERS = [
    { id: 'ghost', img: '/stickers/ghost.png', name: 'Pixel Ghost', rarity: 'common' },
    { id: 'star', emoji: '✨', name: 'Original Star', rarity: 'common' },
    { id: 'cassette', img: '/stickers/cassette.png', name: 'Indigo Tape', rarity: 'rare' },
    { id: 'monstac', img: '/stickers/monstac.png', name: 'Mini Monstac', rarity: 'legendary' },
    { id: 'heart', img: '/stickers/heart.png', name: 'Glitch Heart', rarity: 'common' },
    { id: 'sun', img: '/stickers/sun.png', name: 'Retro Sun', rarity: 'rare' },
    { id: 'jordan', img: '/stickers/jordan.png', name: 'Jordan Sneakers', rarity: 'legendary' },
    { id: 'kitty', img: '/stickers/kitty.png', name: 'Kawaii Kitty', rarity: 'rare' },
    { id: 'cat-orange', img: '/stickers/cat-orange.png', name: 'Orange Tabby', rarity: 'common' },
    { id: 'cat-black', img: '/stickers/cat-black.png', name: 'Shadow Cat', rarity: 'rare' },
    { id: 'cat-white', img: '/stickers/cat-white.png', name: 'White Kitty', rarity: 'common' },
    { id: 'gameboy', img: '/stickers/gameboy.png', name: 'Retro Game Boy', rarity: 'legendary' },
    { id: 'steve', img: '/stickers/steve.jpg', name: 'Steve Harrington', rarity: 'legendary' },
    { id: 'hoodie-cat', img: '/stickers/hoodie-cat.png', name: 'Hoodie Cat', rarity: 'rare' },
    { id: 'orange-face', img: '/stickers/orange-cat-face.png', name: 'Orange Cat Face', rarity: 'common' },
    { id: 'eddie-guitar', img: '/stickers/eddie-guitar.jpg', name: 'Eddie Munson', rarity: 'legendary' },
    { id: 'steve-poster', img: '/stickers/steve-babysitter.jpg', name: 'Steve (Babysitter)', rarity: 'legendary' }
];

const Stickers = () => {
    const [collected, setCollected] = useState(() => {
        const saved = localStorage.getItem('monstac-stickers');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('monstac-stickers', JSON.stringify(collected));
    }, [collected]);

    const collectSticker = (sticker) => {
        if (!collected.find(s => s.id === sticker.id)) {
            setCollected([...collected, {
                ...sticker, pos: {
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                    rot: Math.random() * 20 - 10
                }
            }]);
            window.jjkChat?.('stickers');
        }
    };

    const removeSticker = (id) => {
        setCollected(collected.filter(s => s.id !== id));
    };

    const resetAlbum = () => {
        setCollected([]);
    };

    const collectRandomSticker = () => {
        const uncollected = ALL_STICKERS.filter(s => !collected.find(c => c.id === s.id));
        if (uncollected.length > 0) {
            const random = uncollected[Math.floor(Math.random() * uncollected.length)];
            collectSticker(random);
        }
    };

    return (
        <div className="stickers-page">
            <div className="stickers-header">
                <div className="content-header">
                    <h1>Sticker Album</h1>
                    <div className="typing-text">collect them all... if you can.</div>
                </div>
            </div>

            <div className="stickers-container">
                <div className="available-stickers-section">
                    <h3>Available Stickers</h3>
                    <div className="sticker-grid">
                        {ALL_STICKERS.map(sticker => {
                            const isCollected = collected.find(s => s.id === sticker.id);
                            return (
                                <div
                                    key={sticker.id}
                                    className={`sticker-item ${isCollected ? 'collected' : ''} rarity-${sticker.rarity}`}
                                    onClick={() => !isCollected && collectSticker(sticker)}
                                    title={isCollected ? 'Already collected!' : `Collect ${sticker.name}`}
                                >
                                    {sticker.img ? (
                                        <img src={sticker.img} alt={sticker.name} className="sticker-img" />
                                    ) : (
                                        <span className="sticker-emoji">{sticker.emoji}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="sticker-board-wrapper">
                    <div className="sticker-board" id="stickers-board">
                        {collected.map((s, i) => (
                            <div
                                key={i}
                                className="sticker-item-placed"
                                style={{
                                    left: `${s.pos.x}%`,
                                    top: `${s.pos.y}%`,
                                    transform: `rotate(${s.pos.rot}deg)`
                                }}
                                onDoubleClick={() => removeSticker(s.id)}
                                title="Double click to remove"
                            >
                                {s.img ? (
                                    <img src={s.img} alt={s.name} className="sticker-img-large" />
                                ) : (
                                    <span className="sticker-emoji">{s.emoji}</span>
                                )}
                            </div>
                        ))}
                        {collected.length === 0 && <p className="empty-msg">Your album is empty. Collect some stickers! ✨</p>}
                    </div>
                </div>
            </div>

            <div className="sticker-actions-bottom" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="pixel-btn collect-btn" onClick={collectRandomSticker}>
                    get random sticker
                </button>
                <button className="pixel-btn reset-btn" onClick={resetAlbum}>
                    reset album
                </button>
            </div>
        </div>
    );
};

export default Stickers;
