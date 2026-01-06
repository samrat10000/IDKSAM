import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
    const [text, setText] = useState('');
    const [homeData, setHomeData] = useState(null);
    const fullText = "welcome to my digital bedroom...";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/home`);
                setHomeData(response.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Typing effect logic
        const targetText = (homeData && homeData.welcomeText) ? homeData.welcomeText : fullText;

        // Reset text when target changes
        setText('');

        let index = 0;
        const interval = setInterval(() => {
            index++;
            if (index <= targetText.length) {
                setText(targetText.slice(0, index));
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [homeData]);

    return (
        <React.Fragment>
            <header className="content-header">
                <h1 className="pixel-title">{homeData ? homeData.title : 'Welcome!'}</h1>
                <p className="typing-text">
                    {text}<span className="cursor"></span>
                </p>
            </header>

            <section className="content-body">
                {/* 
                   Permanently showing personal bio instead of DB content 
                   
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
                <p>Mood: <span className="mood-box"></span> {homeData?.status?.mood || 'Hazy'}</p>
                <p>Listening: Iris - The Goo Goo Dolls</p>
                <p>Building: {homeData?.status?.building || 'This website'}</p>
            </div>
        </React.Fragment >
    );
};

export default Home;
