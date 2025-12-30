import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PokeballButton.css';

const PokeballButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin/login');
    };

    return (
        <div
            className="pokeball-admin-btn"
            onClick={handleClick}
            title="Admin access... if you dare"
        >
            <div className="pokeball"></div>
        </div>
    );
};

export default PokeballButton;
