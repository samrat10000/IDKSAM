// Simple password-based authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Change in .env file
    
    if (!token) {
        return res.status(401).json({ error: 'No authorization token provided' });
    }
    
    // Simple check - in production, use JWT or bcrypt
    if (token === adminPassword) {
        next();
    } else {
        return res.status(401).json({ error: 'Invalid authorization token' });
    }
};


export default authMiddleware;
