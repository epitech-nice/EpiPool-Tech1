// controllers/pointsController.js

const Points = require('../models/Points');

exports.getAllPoints = async (req, res) => {
    try {
        const points = await Points.getAll();
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPointsByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const points = await Points.getByTeam(team_id);
        res.json({ points });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPointsToTeam = async (req, res) => {
    try {
        const { team_id, points } = req.body;
        const point = await Points.addPoints(team_id, points);
        res.json(point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removePointsFromTeam = async (req, res) => {
    try {
        const { team_id, points } = req.body;
        const point = await Points.removePoints(team_id, points);
        res.json(point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
