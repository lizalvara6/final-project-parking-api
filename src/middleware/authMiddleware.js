import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    console.log('Auth Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token found');
        return res.status(401).json({ message: 'Access token is missing' });
    }
    
    console.log('Token:', token);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification error:', err.message);
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = user;
        next();
    });
};