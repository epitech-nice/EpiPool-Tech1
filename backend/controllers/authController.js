const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/UserModel');
const Team = require('../models/TeamModel');
const { setIdUser, setUserName } = require('../services/StorageService');

exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({ email, password: hashedPassword, name });
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        setUserName(user.name);
        setIdUser(user.id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
    res.json({ msg: 'Logged out successfully' });
    setUserName(null);
    setIdUser(null);
};

exports.update = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await User.findByPk(req.user);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await user.update({ email, password: hashedPassword, name });
        setUserName(name);
        setIdUser(user.id);
        res.json({ msg: 'User updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

exports.getPoints = async (req, res) => {
    try {
        const teams = await Team.findAll();
        const teamPoints = teams.map(team => {
            return { team_id: team.team_id, name: team.name, points: team.points };
        });
        res.json(teamPoints);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}