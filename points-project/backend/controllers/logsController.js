const Logs = require('../models/Logs');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Logs.getAll();
        if (!logs)
            return res.status(404).json({ error: 'Logs not found' });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogsByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const logs = await Logs.getByTeam(team_id);
        if (!logs)
            return res.status(404).json({ error: 'Logs not found' });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLogsByStudent = async (req, res) => {
    try {
        const { student_id } = req.query;
        const logs = await Logs.getByStudent(student_id);
        if (!logs)
            return res.status(404).json({ error: 'Logs not found' });
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

exports.deleteLog = async (req, res) => {
    try {
        const { log_id } = req.body;
        const log = await Logs.deleteLog(log_id);
        if (!log)
            return res.status(404).json({ error: 'Log not found' });
        res.json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}