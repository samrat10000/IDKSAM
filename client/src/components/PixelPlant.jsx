import React, { useState, useEffect } from 'react';

const PixelPlant = () => {
    const [growth, setGrowth] = useState(() => {
        const saved = localStorage.getItem('monstac-plant-growth');
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('monstac-plant-growth', growth);
    }, [growth]);

    const stages = [
        {
            ascii: " . ",
            label: "seed"
        },
        {
            ascii: " , ",
            label: "sprout"
        },
        {
            ascii: "\\|/",
            label: "growing"
        },
        {
            ascii: "[-|/]",
            label: "budding"
        },
        {
            ascii: "(o|o)",
            label: "indie flower"
        }
    ];

    const handleWater = () => {
        if (growth < stages.length - 1) {
            setGrowth(growth + 1);
        } else {
            // Small reset or "maximum bloom" effect
            alert("The plant is fully grown and happy! ★");
        }
    };

    const handleReset = () => {
        if (window.confirm("Start a new plant?")) {
            setGrowth(0);
        }
    };

    return (
        <div className="pixel-plant-container">
            <div className="plant-header">// digital plant</div>
            <div className="plant-display">
                <pre className="plant-ascii">{stages[growth].ascii}</pre>
            </div>
            <div className="plant-footer">
                <div className="plant-info">stage: {stages[growth].label}</div>
                <div className="plant-controls">
                    <button onClick={handleWater} className="plant-btn water-btn">
                        [water]
                    </button>
                    {growth === stages.length - 1 && (
                        <button onClick={handleReset} className="plant-btn reset-btn">
                            [reset]
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PixelPlant;
