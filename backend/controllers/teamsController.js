const Teams = require('../models/TeamModel');
const Logs = require('../models/LogModel');
const Student = require('../models/StudentModel');
const { isRandomTeamUsed, setRandomTeamUsed } = require('../models/ConfigModel');

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
        const { name, color, points, image_name} = req.body;

        const result = await Teams.addTeam(name, color, points, image_name);
        res.json({ message: `Team ${name} created successfully !`, result });
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
        const team_id = req.query.id;

        const team = await Teams.findByPk(team_id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        await Student.update(
            { team_id: null },
            { where: { team_id: team_id } }
        );

        await team.destroy();

        res.json({ message: 'Team deleted and students updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPoints = async (req, res) => {
    try {
        const teams = await Teams.findAll({
            attributes: ['team_id', 'name', 'points']
        });
        if (!teams.length) {
            return res.status(404).json({ error: 'No teams found' });
        }
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPointsByTeam = async (req, res) => {
    try {
        const { id } = req.query;
        const team = await Teams.findByPk(id, {
            attributes: ['team_id', 'name', 'points']
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPoints = async (req, res) => {
    try {
        const { team_id, points, reason } = req.body;
        const getReason = reason || "PEDAGO";
        const team = await Teams.findByPk(team_id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        team.points += parseInt(points);
        await team.save();
        Logs.addLog(team_id, null, points, getReason);
        res.json({ success: true, message: `Added ${points} points to team ${team.name}`, reason });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removePoints = async (req, res) => {
    try {
        const { team_id, points, reason } = req.body;
        if (!reason) reason = "PEDAGO";

        const team = await Teams.findByPk(team_id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        if (points < 0) {
            return res.status(400).json({ error: 'Points to remove must be a positive number' });
        }
        team.points = Math.max(0, team.points - parseInt(points));
        await team.save();
        Logs.addLog(team_id, null, -points, reason);
        res.json({ success: true, message: `Removed ${points} points from team ${team.name}`, reason });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.randomTeam = async (req, res) => {
    try {
        const isUsed = await isRandomTeamUsed();
        
        if (!isUsed) {
            const studentsWithoutTeam = await Student.findAll({ where: { team_id: null } });
            if (studentsWithoutTeam.length === 0) {
                return res.status(404).json({ error: 'No students without teams found' });
            }

            const teams = await Teams.findAll();
            if (teams.length === 0) {
                return res.status(404).json({ error: 'No teams found' });
            }

            let teamIndex = 0;
            const totalTeams = teams.length;

            for (const student of studentsWithoutTeam) {
                const team = teams[teamIndex];
                student.team_id = team.team_id;
                await student.save();

                teamIndex = (teamIndex + 1) % totalTeams;
            }

            await setRandomTeamUsed();

            res.json({ success: true, message: 'Students assigned to teams evenly' });
        } else {
            return res.status(403).json({ error: 'This route has already been accessed once' });
        }
    } catch (error) {
        console.error('Error assigning students to teams:', error.message);
        res.status(500).json({ error: 'Error assigning students to teams' });
    }
};
