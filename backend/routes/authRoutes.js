const express = require('express');
const { check } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        check('name', 'Name is required').not().isEmpty(),
    ],
    register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

router.post('/logout', authMiddleware, logout);

module.exports = router;
