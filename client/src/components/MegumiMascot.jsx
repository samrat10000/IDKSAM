import React, { useState, useEffect } from 'react';
import './MegumiMascot.css';

const MegumiMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    const quotes = [
        "With this treasure, I summon... your feedback!",
        "Divine Dogs, protect the guestbook!",
        "Taming these comments... one by one.",
        "Mahoraga, write them a nice reply... wait, no!",
        "I'm not a hero. I'm a sorcerer... who reads guestbooks.",
        "Your message has been received... by my shadows.",
        "Shadow Chimera Garden! (but for comments).",
    ];

    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);
        if (window.megumiTimer) clearTimeout(window.megumiTimer);
        window.megumiTimer = setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    // Expose say function globally
    useEffect(() => {
        window.megumiSay = say;
        return () => {
            window.megumiSay = null;
        };
    }, [say]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const msg = quotes[Math.floor(Math.random() * quotes.length)];
                say(msg);
            }
        }, 22000);

        return () => {
            clearInterval(interval);
            if (window.megumiTimer) clearTimeout(window.megumiTimer);
        };
    }, []);

    return (
        <div className="megumi-mascot">
            {showBubble && (
                <div className="megumi-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/megumi.png"
                alt="Megumi"
                className="megumi-image"
                onClick={() => say("Please, don't summon Mahoraga by clicking too much.")}
            />
        </div>
    );
};

export default MegumiMascot;
