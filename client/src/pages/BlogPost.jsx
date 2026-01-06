import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/blog/${id}`);
                setPost(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).toLowerCase() + ' // ' + date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="loading">reconstructing digital memory...</div>;
    if (error) return (
        <div className="error-container">
            <div className="error-box">⚡ error: {error}</div>
            <Link to="/blog" className="back-link">← return to index</Link>
        </div>
    );

    return (
        <div className="blog-post-page">
            <Link to="/blog" className="back-to-blog">← back to journal</Link>

            <article className="full-post">
                <header className="post-header">
                    <h1 className="post-full-title">{post.title}</h1>
                    <div className="post-info">
                        <span className="info-date">{formatDate(post.createdAt)}</span>
                        {post.tags && post.tags.length > 0 && (
                            <div className="info-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                <div className="post-content">
                    {post.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>

                <footer className="post-footer">
                    <div className="end-of-transmission">// end of transmission</div>
                    <Link to="/blog" className="footer-back-link">← index</Link>
                </footer>
            </article>
        </div>
    );
};

export default BlogPost;
