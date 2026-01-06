import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VisitCounter = () => {
    const [visits, setVisits] = useState(0);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/visits`);
                setVisits(res.data.count);

                // Increment on visit
                const hasVisited = sessionStorage.getItem('hasVisited');
                if (!hasVisited) {
                    const incRes = await axios.post(`${API_URL}/api/visits/increment`);
                    setVisits(incRes.data.count); // Changed from setCount to setVisits
                    sessionStorage.setItem('hasVisited', 'true'); // Changed from 'visited' to 'hasVisited'
                }
            } catch (err) {
                console.error('Error fetching visits:', err);
            }
        };

        fetchVisits();
    }, []);

    const formattedCount = String(visits).padStart(6, '0');

    return (
        <div className="visit-counter">
            <div className="counter-label">visitor_no</div>
            <div className="counter-digits">
                {formattedCount.split('').map((digit, i) => (
                    <span key={i} className="digit">{digit}</span>
                ))}
            </div>
        </div>
    );
};

export default VisitCounter;
