// controllers/logsController.js

const Logs = require('../models/Logs');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Logs.getAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogsByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const logs = await Logs.getByTeam(team_id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogsByStudent = async (req, res) => {
    try {
        const { student_id } = req.query;
        const logs = await Logs.getByStudent(student_id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
