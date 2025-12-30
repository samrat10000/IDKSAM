import React, { useState, useEffect } from 'react';
import './InosukeMascot.css';

const InosukeMascot = () => {
    const [message, setMessage] = useState('');
    const [showBubble, setShowBubble] = useState(false);

    // Random idle messages
    const idleMessages = [
        "HEY YOU!! Click something already!",
        "I'm the KING of this website!",
        "Fight me! ...or just browse around.",
        "My swords are sharper than your code!",
        "MONJIRO!! Wait... wrong site.",
        "Bored... entertain me, human!",
        "The master of this site is a total weakling! (but don't tell them I said that...)",
        "Why is this page so full of pictures of BIKES?? ARE THEY STICKIER THAN BUGS??",
        "PIG ASSAULT!! I mean... Welcome!",
        "The owner of this site doesn't even bath... STINKY!!",
        "I guess the owner is okay... as a subordinate!!",
        "HEY BLIND-FOLD! STOP FLOATING AROUND!!",
        "THE MAN WITH THE BLACK BUN... FIGHT ME!!",
    ];

    // Function to trigger a message (clears existing timers)
    const say = (msg) => {
        setMessage(msg);
        setShowBubble(true);

        // Clear any previous auto-hide timer
        if (window.inosukeTimer) clearTimeout(window.inosukeTimer);

        window.inosukeTimer = setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    // Expose say to window object for global access
    useEffect(() => {
        window.inosukeSay = say;
        return () => {
            delete window.inosukeSay;
            if (window.inosukeTimer) clearTimeout(window.inosukeTimer);
        };
    }, []);

    // Show random message on mount and periodically
    useEffect(() => {
        const showRandomMessage = () => {
            const msg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
            say(msg);
        };

        const initialTimer = setTimeout(showRandomMessage, 3000);
        const interval = setInterval(showRandomMessage, 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="inosuke-mascot">
            {showBubble && (
                <div className="inosuke-bubble">
                    {message}
                </div>
            )}
            <img
                src="/mascot/inosuke.png"
                alt="Inosuke"
                className="inosuke-image"
                onClick={() => say("DON'T POKE ME!!")}
            />
        </div>
    );
};

export default InosukeMascot;
