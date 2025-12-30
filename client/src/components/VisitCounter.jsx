import React, { useState, useEffect } from 'react';

const VisitCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Only increment once per session
        const hasVisited = sessionStorage.getItem('visited');

        const fetchCount = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/visits');
                const data = await res.json();
                setCount(data.count);

                if (!hasVisited) {
                    const incRes = await fetch('http://localhost:5000/api/visits/increment', { method: 'POST' });
                    const incData = await incRes.json();
                    setCount(incData.count);
                    sessionStorage.setItem('visited', 'true');
                }
            } catch (err) {
                console.error('Error fetching visits:', err);
            }
        };

        fetchCount();
    }, []);

    const formattedCount = String(count).padStart(6, '0');

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
