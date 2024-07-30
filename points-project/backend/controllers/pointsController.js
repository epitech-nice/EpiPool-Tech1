// controllers/pointsController.js

const Points = require('../models/Points');

exports.getAllPoints = async (req, res) => {
    try {
        const points = await Points.getAll();
        if (!points)
            return res.status(404).json({ error: 'Points not found' });
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPointsByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const points = await Points.getByTeam(team_id);
        if (!points)
            return res.status(404).json({ error: 'Points not found' });
        res.json({ points });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPointsToTeam = async (req, res) => {
    try {
        const { team_id, points, reason } = req.body;
        if (!reason)
            reason = "PEDAGO";
        const point = await Points.addPoints(team_id, points, reason);
        if (!point)
            return res.status(404).json({ error: 'Team not found' });
        res.json(point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removePointsFromTeam = async (req, res) => {
    try {
        const { team_id, points, reason } = req.body;
        if (!reason) {
            reason = "PEDAGO";
        }
        if (points < 0) {
            return res.status(400).json({ error: 'Points to remove must be a positive number' });
        }
        const result = await Points.removePoints(team_id, points, reason);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

