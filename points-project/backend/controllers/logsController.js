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

exports.addLog = async (req, res) => {
    try {
        const { team_id, student_id, points, event } = req.body;
        if (!team_id && !student_id)
            return res.status(400).json({ error: 'team_id or student_id are required' });
        if (!event)
            event = "Pedago";
        const log = await Logs.addLog(team_id, student_id, points, event);
        res.json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
