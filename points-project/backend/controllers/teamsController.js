const Teams = require('../models/Teams');

exports.getStarterTeams = async (req, res) => {
    try {
        const teams = await Teams.getStarter();
        if (!teams)
            return res.status(404).json({ error: 'Teams not found' });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFactionsTeams = async (req, res) => {
    try {
        const teams = await Teams.getFactions();
        if (!teams)
            return res.status(404).json({ error: 'Teams not found' });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Teams.getAll();
        if (!teams)
            return res.status(404).json({ error: 'Teams not found' });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addTeam = async (req, res) => {
    try {
        const { name, color } = req.body;
        const result = await Teams.addTeam(name, color);
        res.json({ message: 'Team added successfully', result });
    } catch (error) {
        if (error.message === 'Team with this name already exists') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the team' });
        }
    }
};

exports.changeTeam = async (req, res) => {
    try {
        const { team_id, name, color } = req.body;
        const team = await Teams.changeTeam(team_id, name, color);
        res.json(team);
    } catch (error) {
        if (error.message === 'Team not found') {
            res.status(404).json({ error: 'Team not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { team_id } = req.body;
        const team = await Teams.deleteTeam(team_id);
        res.json(team);
    } catch (error) {
        if (error.message === 'Team not found') {
            res.status(404).json({ error: 'Team not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
