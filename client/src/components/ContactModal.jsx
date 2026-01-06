import React, { useState } from 'react';
import axios from 'axios';
import './ContactModal.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fromName: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    if (!isOpen) return null;

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
                onClose();
                setStatus('idle');
                setFormData({ fromName: '', subject: '', message: '' });
            }, 2000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="retro-modal-overlay">
            <div className="retro-window">
                <div className="retro-title-bar">
                    <span className="retro-title-text">Compose Mail</span>
                    <button className="retro-close-btn" onClick={onClose}>X</button>
                </div>

                <div className="retro-window-body">
                    {status === 'success' ? (
                        <div className="success-screen">
                            <p>TRANSMISSION SENT 📨</p>
                            <p>Thank you.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="retro-form">
                            <div className="form-group">
                                <label>FROM:</label>
                                <input
                                    type="text"
                                    name="fromName"
                                    value={formData.fromName}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>SUBJECT:</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                    required
                                />
                            </div>

                            <div className="retro-footer">
                                <button type="button" onClick={onClose} className="retro-btn cancel">Cancel</button>
                                <button type="submit" className="retro-btn send" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Dialing...' : 'Send Mail'}
                                </button>
                            </div>
                            {status === 'error' && <p className="error-msg">Error: Check console or try again later.</p>}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
