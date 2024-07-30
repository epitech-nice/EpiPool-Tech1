// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

        // Create and send JWT
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
