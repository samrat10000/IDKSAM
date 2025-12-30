import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './BlogEditor.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogEditor = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', tags: '', published: true });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchPosts();
    }, [token, navigate]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/blog`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const postData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };

        try {
            const url = editingPost
                ? `${API_URL}/api/admin/blog/${editingPost._id}`
                : `${API_URL}/api/admin/blog`;

            const method = editingPost ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                setMessage(editingPost ? 'Post updated! ⚡' : 'Post created! ⚡');
                resetForm();
                fetchPosts();
            } else {
                setMessage('Error saving post. Check backend logs.');
            }
        } catch (err) {
            setMessage('Connection error.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            tags: post.tags.join(', '),
            published: post.published
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this digital fragment forever?')) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/blog/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchPosts();
                if (editingPost && editingPost._id === id) resetForm();
            }
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    const resetForm = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            tags: '',
            published: false
        });
    };

    return (
        <div className="admin-editor-container">
            <header className="admin-editor-header">
                <div>
                    <h1>// blog editor</h1>
                    <Link to="/admin/dashboard" className="back-link">← dashboard</Link>
                </div>
                <button onClick={resetForm} className="new-btn">+ new post</button>
            </header>

            {message && <div className="editor-message">{message}</div>}

            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-row">
                    <div className="input-group">
                        <label>post title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="entering the void..."
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>excerpt (short summary)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            placeholder="a brief glimpse into the entry..."
                            rows="2"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="indie, retro, thoughts..."
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>main content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            placeholder="writing digital history..."
                            rows="10"
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleInputChange}
                        />
                        <span>published (publicly visible)</span>
                    </label>

                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? 'saving...' : editingPost ? 'update entry ⚡' : 'create entry ⚡'}
                    </button>
                </div>
            </form>

            <section className="entries-list-section">
                <h2>existing entries</h2>
                <div className="entries-grid">
                    {posts.map(post => (
                        <div key={post._id} className={`entry-item ${post.published ? 'is-published' : 'is-draft'}`}>
                            <div className="entry-main">
                                <span className="entry-status">{post.published ? 'LIVE' : 'DRAFT'}</span>
                                <h3>{post.title}</h3>
                                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="entry-actions">
                                <button onClick={() => handleEdit(post)} className="edit-action">edit</button>
                                <button onClick={() => handleDelete(post._id)} className="delete-action">delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogEditor;
