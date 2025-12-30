import React, { useState, useEffect } from 'react';
import './TojiMascot.css';

const TojiMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    const quotes = [
        "Oh, right... I forgot.",
        "I'm just a monkey who can't use sorcery.",
        "Writing things down... I'll probably forget them later.",
        "Did you pay for this content? I don't work for free.",
        "The Zenin clan... what a drag.",
        "Just blogging my way through the day.",
        "I'm a hollow man, living a hollow life... on a hollow blog.",
    ];

    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);
        if (window.tojiTimer) clearTimeout(window.tojiTimer);
        window.tojiTimer = setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    // Expose say function globally
    useEffect(() => {
        window.tojiSay = say;
        return () => {
            window.tojiSay = null;
        };
    }, [say]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const msg = quotes[Math.floor(Math.random() * quotes.length)];
                say(msg);
            }
        }, 20000);

        return () => {
            clearInterval(interval);
            if (window.tojiTimer) clearTimeout(window.tojiTimer);
        };
    }, []);

    return (
        <div className="toji-mascot">
            {showBubble && (
                <div className="toji-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/toji.png"
                alt="Toji"
                className="toji-image"
                onClick={() => say("You've got some nerve clicking me.")}
            />
        </div>
    );
};

export default TojiMascot;
