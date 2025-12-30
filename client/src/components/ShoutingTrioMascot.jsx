import React, { useState, useEffect } from 'react';
import './ShoutingTrioMascot.css';

const ShoutingTrioMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    const shouts = [
        "WWWWWWWWAAAAAAAAHHHHHHHHHH!!!!",
        "SPEED!!!!!!!!! WE NEED MORE SPEED!!!!!!!!!",
        "INOSUKE!!!!!!!! STOP RUNNING TOWARDS THE ENGINE!!!!!!!!",
        "MY EARS!!!!!!!! THOSE EXHAUSTS ARE TOO LOUD!!!!!!!!",
        "BEAUTIFUL!!!!!!!! THESE MACHINES ARE BEAUTIFUL!!!!!!!!",
        "TENERE!!!!!!!! I WANT THE TENEREEEEEE!!!!!!!!",
        "VROOOOOOOOOM!!!!!!!! VROOOOOOOOOOOOOOMM!!!!!!!!",
        "STOP SHOUTING!!!!!!!! YOU'RE THE ONES SHOUTING!!!!!!!!",
    ];

    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);
        if (window.shoutTimer) clearTimeout(window.shoutTimer);
        window.shoutTimer = setTimeout(() => {
            setShowBubble(false);
        }, 3000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const msg = shouts[Math.floor(Math.random() * shouts.length)];
                say(msg);
            }
        }, 15000);

        return () => {
            clearInterval(interval);
            if (window.shoutTimer) clearTimeout(window.shoutTimer);
        };
    }, []);

    return (
        <div className="shout-mascot">
            {showBubble && (
                <div className="shout-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/shouting-trio.png"
                alt="Shouting Trio"
                className="shout-image"
                onClick={() => say("AAAAAAAAAAAAHHHHHHHHHHHHH!!!!!!!!")}
            />
        </div>
    );
};

export default ShoutingTrioMascot;
