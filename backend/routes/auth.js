const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock admin user - in production, this would be in database
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '$2b$10$L8TIif0ym6lYYsfwuH.MP.2LjanAhhaRQ4RPCmFM74DrFqTUbRBiu' // hashed 'admin123'
};

// @route   POST /api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        if (username !== ADMIN_CREDENTIALS.username) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: 'admin',
                username: ADMIN_CREDENTIALS.username
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/auth/verify
// @desc    Verify token and return user info
// @access  Private
router.get('/verify', require('../middleware/auth'), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;