import React, { useState, useEffect } from 'react';
import './TanjiroZenitsuMascot.css';

const TanjiroZenitsuMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    const idleMessages = [
        "What is this place, Tanjiro? It's scary...",
        "Zenitsu, stay calm! It's just a website.",
        "Is that a... POKEBALL?? Why is it here??",
        "Wait, is that Inosuke over there?? INOSUKE!!",
        "Ne-Nezuko-chan?? Are you in one of these pages??",
        "The colors... they keep changing...",
        "I smell... a very cozy atmosphere here.",
        "TANJIROOO!! Help me! The cursor is chasing me!",
        "Don't worry Zenitsu, I'll protect you!",
        "Why is there a vending machine floating around??",
    ];

    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);
        if (window.tzTimer) clearTimeout(window.tzTimer);
        window.tzTimer = setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    // Expose say to window object for global access
    useEffect(() => {
        window.tzSay = say;
        return () => {
            delete window.tzSay;
            if (window.tzTimer) clearTimeout(window.tzTimer);
        };
    }, []);

    useEffect(() => {
        const showRandomMessage = () => {
            const msg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
            say(msg);
        };
        const initialTimer = setTimeout(showRandomMessage, 5000); // Delay slightly after Inosuke
        const interval = setInterval(showRandomMessage, 25000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
            if (window.tzTimer) clearTimeout(window.tzTimer);
        };
    }, []);

    return (
        <div className="tz-mascot">
            {showBubble && (
                <div className="tz-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/tanjiro-zenitsu.png"
                alt="Tanjiro and Zenitsu"
                className="tz-image"
                onClick={() => say("WAAAAH!! DON'T TOUCH US!!")}
            />
        </div>
    );
};

export default TanjiroZenitsuMascot;
