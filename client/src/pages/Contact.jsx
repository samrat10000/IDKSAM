import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Contact = () => {
    const [formData, setFormData] = useState({
        fromName: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await axios.post(`${API_URL}/api/contact/send`, formData);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ fromName: '', subject: '', message: '' });
            }, 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="contact-page-container fade-in">
            <header className="content-header">
                <h1 className="pixel-title">Orbit Mail Protocol</h1>
                <p>Establishing uplink to the webmaster...</p>
            </header>

            <div className="retro-window-standalone">
                <div className="retro-title-bar">
                    <span className="retro-title-text">Compose Mail :: TERMINAL-01</span>
                    <div className="retro-window-controls">
                        <span className="control-box">_</span>
                        <span className="control-box">□</span>
                        <span className="control-box">X</span>
                    </div>
                </div>

                <div className="retro-window-body">
                    {status === 'success' ? (
                        <div className="success-screen">
                            <p className="blink">>> TRANSMISSION SENT SUCCESSFULLY</p>
                            <p>Target acquired. Response pending.</p>
                            <br />
                            <button onClick={() => setStatus('idle')} className="retro-btn">Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="retro-form">
                            <div className="form-group">
                                <label>>> SENDER_ID (NAME):</label>
                                <input
                                    type="text"
                                    name="fromName"
                                    value={formData.fromName}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                    className="terminal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>>> FREQUENCY_CHANNEL (SUBJECT):</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="terminal-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>>> DATA_PACKET (MESSAGE):</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="terminal-input"
                                    rows="6"
                                />
                            </div>

                            <div className="retro-footer">
                                <span className={status === 'error' ? 'error-msg blink' : 'status-msg'}>
                                    {status === 'error' ? '!! UPLINK FAILED !!' : 'READY TO TRANSMIT'}
                                </span>
                                <button type="submit" className="retro-btn send" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'UPLOADING...' : 'INITIATE SEND'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
