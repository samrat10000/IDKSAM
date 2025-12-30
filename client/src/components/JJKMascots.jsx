import React, { useState, useEffect, useCallback } from 'react';
import './JJKMascots.css';

const JJKMascots = ({ onMusicToggle, musicOpen }) => {
    const [gojoMsg, setGojoMsg] = useState('');
    const [getoMsg, setGetoMsg] = useState('');
    const [showGojo, setShowGojo] = useState(false);
    const [showGeto, setShowGeto] = useState(false);

    const say = useCallback((speaker, msg, duration = 4000) => {
        if (speaker === 'gojo') {
            setGojoMsg(msg);
            setShowGojo(true);
            setTimeout(() => setShowGojo(false), duration);
        } else if (speaker === 'geto') {
            setGetoMsg(msg);
            setShowGeto(true);
            setTimeout(() => setShowGeto(false), duration);
        } else if (speaker === 'inosuke') {
            if (window.inosukeSay) window.inosukeSay(msg);
        } else if (speaker === 'tanjiro') {
            if (window.tzSay) window.tzSay(msg);
        } else if (speaker === 'toji') {
            if (window.tojiSay) window.tojiSay(msg);
        } else if (speaker === 'itadori') {
            if (window.itaSay) window.itaSay(msg);
        } else if (speaker === 'megumi') {
            if (window.megumiSay) window.megumiSay(msg);
        }
    }, []);

    const chat = useCallback(async (scenario) => {
        const dialogs = {
            idle: [
                { s: 'gojo', m: "Geto, look! This website has no infinite void, but it's pretty cozy." },
                { s: 'geto', m: "It's just full of non-sorcerers and bikes, Satoru." },
                { s: 'gojo', m: "Exactly! Perfect for a vacation!" }
            ],
            stickers: [
                { s: 'gojo', m: "OOH! A STICKER!! Is it limited edition?" },
                { s: 'geto', m: "It's just a pixel on a screen, Satoru. Stop being so excited." },
                { s: 'gojo', m: "You're just jealous because I'm the strongest collector!" }
            ],
            inosuke: [
                { s: 'gojo', m: "Hey pig-head! Nice mask. Is it a cursed tool?" },
                { s: 'inosuke', m: "IT'S NOT A MASK!! IT'S MY FACE!!" },
                { s: 'geto', m: "I think he just likes yelling, Satoru." },
                { s: 'gojo', m: "He's enthusiastic! I like it!" }
            ],
            bikes: [
                { s: 'geto', m: "Those 'monsters' Satoru? They're just motorcycles." },
                { s: 'gojo', m: "Geto, don't be a buzzkill! They look like they could run over a Grade 1 curse!" }
            ],
            about: [
                { s: 'gojo', m: "The master won't bath? That's gross, even for a non-sorcerer." },
                { s: 'geto', m: "Maybe they're just busy building this 'infinite' dashboard." }
            ],
            strongest: [
                { s: 'gojo', m: "I bet I could debug this entire site in 0.2 seconds." },
                { s: 'geto', m: "Confidence or arrogance, Satoru?" },
                { s: 'inosuke', m: "DEBUG?! I'LL FIGHT THE BUGS!!! WHERE ARE THEY??" },
                { s: 'gojo', m: "Haha! See? He gets it!" }
            ],
            bugs: [
                { s: 'inosuke', m: "I SENSE A PRESENCE... A BUG!!!" },
                { s: 'geto', m: "It's probably just a console error, Inosuke. Calm down." },
                { s: 'gojo', m: "Should I use Hollow Purple on the syntax error?" },
                { s: 'inosuke', m: "PIG ASSAULT ON THE CODE!!!" }
            ],
            trash: [
                { s: 'geto', m: "This vending machine... it only accepts digital coins?" },
                { s: 'gojo', m: "I want the Sukuna finger!! Or maybe the pudding." },
                { s: 'inosuke', m: "I ATE THE PUDDING! AND THE SPOON!" },
                { s: 'geto', m: "...animals, both of you." }
            ],
            music: [
                { s: 'gojo', m: "This lo-fi beat... it's almost as relaxing as my Infinity." },
                { s: 'inosuke', m: "IT'S TOO QUIET!! PLAY THE DRUMS OF WAR!!" },
                { s: 'geto', m: "Quiet down. Some of us are trying to brood mysteriously." }
            ],
            visitors: [
                { s: 'geto', m: "So many non-sorcerers staring at us..." },
                { s: 'gojo', m: "They're called 'Users', Suguru! And they love me!" },
                { s: 'inosuke', m: "I'LL FIGHT THEM ALL! ONE V ONE ME, WEB SURFER!!" }
            ],
            screen_break: [
                { s: 'inosuke', m: "I'M TRAPPED IN THIS RECTANGLE!! LET ME OUT!!" },
                { s: 'gojo', m: "It's called a 'div', pig-head. You can't cut through the DOM." },
                { s: 'inosuke', m: "DOM?! I'LL EAT THIS DOM!!!" },
                { s: 'geto', m: "Satoru, please don't teach him technical terms." }
            ],
            demon_slayers: [
                { s: 'tanjiro', m: "Zenitsu, look! These people are very strong!" },
                { s: 'gojo', m: "Haha! You've got good eyes, kid! Want to see my Infinity?" },
                { s: 'geto', m: "Satoru, don't scare the children. The blonde one is already crying." },
                { s: 'inosuke', m: "I DON'T CARE HOW STRONG YOU ARE!! FIGHT ME!!" },
                { s: 'gojo', m: "I like this group. They're loud!" }
            ],
            toji_roast: [
                { s: 'toji', m: "Still wearing that blindfold, Satoru? Scared to face reality?" },
                { s: 'gojo', m: "Look who's back from the dead! Did you find a job yet, or are you still a monkey?" },
                { s: 'toji', m: "I don't need a job when I can just take what I want. Like your pride." },
                { s: 'geto', m: "Both of you are being incredibly immature. Satoru, ignore him." },
                { s: 'gojo', m: "But Suguru! He started it! He's just mad I'm effectively a God." }
            ],
            fushiguro_family: [
                { s: 'megumi', m: "With this treasure, I summon... wait, Dad? Why are you here?" },
                { s: 'toji', m: "Just checking if you're still acting like a hero. Disappointing." },
                { s: 'gojo', m: "Hey Megumi! Don't listen to him. Your teacher is way cooler!" },
                { s: 'megumi', m: "I'm surrounded by idiots..." }
            ],
            sukuna_guest: [
                { s: 'itadori', m: "Gojo-sensei! This dashboard is huge! Is Sukuna allowed here?" },
                { s: 'gojo', m: "As long as he doesn't touch the CSS, Yuuji! I just fixed the margins." },
                { s: 'geto', m: "You have a King of Curses in your student? Interesting..." },
                { s: 'itadori', m: "He's being quiet for now. I think he likes the lo-fi beats." }
            ],
            crossover_chaos: [
                { s: 'tanjiro', m: "I smell... a very powerful curse energy! Zenitsu, stay back!" },
                { s: 'itadori', m: "Wait, you can smell it too? I'm Yuuji! Don't worry, Gojo-sensei is here." },
                { s: 'inosuke', m: "I DON'T CARE ABOUT SMELLS!! WHO'S THE STRONGEST HERE?!" },
                { s: 'gojo', m: "Me. Obviously. Catch up, kids!" }
            ],
            roast_session: [
                { s: 'geto', m: "Satoru, your ego is taking up more bandwidth than the images." },
                { s: 'gojo', m: "That's because my ego is INFINITE, Suguru!" },
                { s: 'toji', m: "Infinite arrogance, maybe. You're still just a kid with fancy eyes." },
                { s: 'gojo', m: "Fancy eyes that see you're still wearing the same shirt from 10 years ago, monkey." }
            ],
            technical_difficulties: [
                { s: 'gojo', m: "Is the site lagging? Or is it just my perceived time slowing down?" },
                { s: 'geto', m: "It's the 16:9 backgrounds, Satoru. They're heavy." },
                { s: 'itadori', m: "I can help carry them! I'm pretty strong!" },
                { s: 'megumi', m: "Yuuji... that's not how digital files work." }
            ]
        };

        const sequence = dialogs[scenario] || [];
        for (const part of sequence) {
            say(part.s, part.m);
            await new Promise(r => setTimeout(r, 4500));
        }
    }, [say]);

    useEffect(() => {
        window.idles = [
            () => say('gojo', "Master is working hard on this site!"),
            () => say('geto', "Another non-sorcerer visited... fascinating."),
            () => say('inosuke', "I'LL HEADBUTT THE GUESTBOOK!!"),
            () => say('tanjiro', "The air here is very digital..."),
            () => say('toji', "Looking for someone? Or just wasting time?"),
            () => say('itadori', "This music is actually pretty fire!"),
            () => say('megumi', "Keep it down... I'm trying to concentrate."),
        ];

        window.jjkChat = chat;
        window.jjkSay = say;

        // Bridge to listen for Inosuke
        const originalInosukeSay = window.inosukeSay;
        window.inosukeSay = (msg) => {
            if (originalInosukeSay) originalInosukeSay(msg);
            if (msg && (msg.includes('BLIND-FOLD') || msg.includes('BUN'))) {
                setTimeout(() => chat('inosuke'), 2000);
            }
        };

        const idleInterval = setInterval(() => {
            const scenarios = [
                'idle', 'inosuke', 'strongest', 'bugs', 'trash', 'bikes',
                'music', 'visitors', 'screen_break', 'demon_slayers',
                'toji_roast', 'fushiguro_family', 'sukuna_guest',
                'crossover_chaos', 'roast_session', 'technical_difficulties'
            ];

            // 60% chance for a full chat, 40% for an individual idle line
            if (Math.random() > 0.4) {
                chat(scenarios[Math.floor(Math.random() * scenarios.length)]);
            } else {
                const idleLines = window.idles;
                idleLines[Math.floor(Math.random() * idleLines.length)]();
            }
        }, 30000); // 30 seconds interval

        return () => {
            clearInterval(idleInterval);
            window.inosukeSay = originalInosukeSay;
            delete window.jjkChat;
            delete window.jjkSay;
            delete window.idles;
        };
    }, [chat, say]);

    return (
        <div className="jjk-mascots-container">
            <div className="mascot-pair gojo">
                {showGojo && <div className="gojo-bubble">{gojoMsg}</div>}
                <img src="/mascot/gojo.png" alt="Gojo" className="jjk-image" onClick={() => say('gojo', "Are you approaching me?")} />
            </div>
            <div className="mascot-pair geto">
                {showGeto && <div className="geto-bubble">{getoMsg}</div>}
                <img src="/mascot/geto.png" alt="Geto" className="jjk-image" onClick={() => say('geto', "Satoru, stop embarrassing us.")} />
            </div>
        </div>
    );
};

export default JJKMascots;

