// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your secret key

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified; // Store user data in request
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
