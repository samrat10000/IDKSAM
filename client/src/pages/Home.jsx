import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [text, setText] = useState('');
    const [data, setData] = useState(null);
    const fullText = "welcome to the digital bedroom...";

    useEffect(() => {
        // Fetch dynamic content
        fetch('http://localhost:5000/api/home')
            .then(res => res.json())
            .then(val => {
                setData(val);
                // Trigger typing effect for welcome text from DB if available
                const welcomeStr = val.welcomeText || fullText;
                let index = 0;
                const interval = setInterval(() => {
                    if (index <= welcomeStr.length) {
                        setText(welcomeStr.slice(0, index));
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                // Fallback typing effect
                let index = 0;
                const interval = setInterval(() => {
                    if (index <= fullText.length) {
                        setText(fullText.slice(0, index));
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            });
    }, []);

    return (
        <React.Fragment>
            <header className="content-header">
                <h1 className="pixel-title">{data ? data.title : 'Welcome!'}</h1>
                <p className="typing-text">
                    {text}<span className="cursor"></span>
                </p>
            </header>

            <section className="content-body">
                {/* 
                   Permanently showing personal bio instead of DB content 
                   as per user request for this specific text.
                */}
                <>
                    <p>i'm sam. just a college student who codes sometimes. i like bikes, music, and building stuff on the web. this site is my digital space for things i'm working on and things i like.</p>
                    <br />
                    <p style={{ color: 'var(--accent)' }}>this site is always under construction. i'm constantly updating it, so there might be bugs here and there.</p>
                    <br />
                    <p>got ideas for themes or features? <Link to="/guestbook" style={{ color: 'var(--highlight)', textDecoration: 'underline' }}>drop a note in the guestbook</Link> — i'd love to hear them!</p>
                    <br />
                    <p>thanks for stopping by.</p>
                </>
            </section>

            <div className="status-box">
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                            // CURRENT STATUS
                </p>
                <p>Mood: <span className="mood-box"></span> {data?.status?.mood || 'Hazy'}</p>
                <p>Listening: Iris - The Goo Goo Dolls</p>
                <p>Building: {data?.status?.building || 'This website'}</p>
            </div>
        </React.Fragment >
    );
};

export default Home;
