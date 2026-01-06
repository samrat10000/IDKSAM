import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shakeIt, setShakeIt] = useState(false);
    const navigate = useNavigate();

    const pikachuWarnings = [
        "⚡ HEYYYYYYY! Pikachu will shock you! ⚡",
        "⚡ Wrong password! Pikachu used Thunder Shock! ⚡",
        "⚡ Nice try! Pikachu is charging up... ⚡",
        "⚡ BZZZZT! That's not it! Pikachu says no! ⚡",
        "⚡ Pika Pika! (Translation: GET OUT!) ⚡"
    ];

    const getRandomWarning = () => {
        return pikachuWarnings[Math.floor(Math.random() * pikachuWarnings.length)];
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/admin/login`, { password });

            const data = response.data;

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(getRandomWarning());
                setShakeIt(true);
                setTimeout(() => setShakeIt(false), 500);
            }
        } catch (err) {
            setError('⚡ Connection error! Even Pikachu can\'t reach the server! ⚡');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className={`admin-login-box ${shakeIt ? 'shake' : ''}`}>
                <div className="login-header">
                    <h1>// admin access</h1>
                    <p className="login-subtitle">enter password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'authenticating...' : 'login →'}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="/" className="back-link">← back to site</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
