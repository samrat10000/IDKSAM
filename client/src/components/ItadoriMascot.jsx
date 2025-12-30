import React, { useState, useEffect } from 'react';
import './ItadoriMascot.css';

const ItadoriMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    const quotes = [
        "Stand proud. You found the links.",
        "I'm not letting these links go alone!",
        "Exchange of souls... or just URLs?",
        "Establish connections! That's the Yuji style!",
        "Are these links... strong?",
        "Sukuna, stop trying to eat the router!",
        "If you're looking for something, it might be here.",
        "Connections are everything, right?",
    ];

    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);
        if (window.itaTimer) clearTimeout(window.itaTimer);
        window.itaTimer = setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    // Expose say function globally
    useEffect(() => {
        window.itaSay = say;
        return () => {
            window.itaSay = null;
        };
    }, [say]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const msg = quotes[Math.floor(Math.random() * quotes.length)];
                say(msg);
            }
        }, 18000);

        return () => {
            clearInterval(interval);
            if (window.itaTimer) clearTimeout(window.itaTimer);
        };
    }, []);

    return (
        <div className="ita-mascot">
            {showBubble && (
                <div className="ita-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/itadoris.png"
                alt="Itadoris"
                className="ita-image"
                onClick={() => say("Whoa! Careful where you click!")}
            />
        </div>
    );
};

export default ItadoriMascot;
