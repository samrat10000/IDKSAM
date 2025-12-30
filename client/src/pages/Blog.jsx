import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TojiMascot from '../components/TojiMascot';
import './Blog.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/blog`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).toLowerCase() + ' // ' + date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="loading">fetching letters from the void...</div>;

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1 className="glitch-text" data-text="the journal">// the journal</h1>
                <p className="blog-subtitle">thoughts, logs, and digital fragments.</p>
            </header>

            {error && <div className="error-box">⚡ error: {error}</div>}

            <div className="posts-list">
                {posts.length === 0 ? (
                    <div className="empty-state">
                        <p>the void is quiet today.</p>
                        <span className="ascii-art"> ( •_•) </span>
                    </div>
                ) : (
                    posts.map(post => (
                        <article key={post._id} className="blog-post-card">
                            <div className="post-meta">
                                <span className="post-date">{formatDate(post.createdAt)}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="post-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <h2 className="post-title">
                                <Link to={`/blog/${post._id}`}>{post.title}</Link>
                            </h2>
                            <p className="post-excerpt">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                            <Link to={`/blog/${post._id}`} className="read-more-btn">read more →</Link>
                        </article>
                    ))
                )}
            </div>
            <TojiMascot />
        </div>
    );
};

export default Blog;
