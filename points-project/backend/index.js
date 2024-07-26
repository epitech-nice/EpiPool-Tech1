const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Teams = require('./models/Teams');
const Students = require('./models/Students');
const Points = require('./models/Points');
const Logs = require('./models/Logs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//REQUEST for the teams
app.get('/api/starter_teams', async (req, res) => {
    try {
        const teams = await Teams.getStarter(); 
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/factions_teams', async (req, res) => {
    try {
        const teams = await Teams.getFactions();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/all_teams', async (req, res) => {
    try {
        const teams = await Teams.getAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/add_team', async (req, res) => {
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
});

app.put('/api/change_team', async (req, res) => {
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
});

app.delete('/api/delete_team', async (req, res) => {
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
});

//REQUEST for the students
app.get('/api/all_students', async (req, res) => {
    try {
        const students = await Students.getAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/students_by_team', async (req, res) => {
    try {
        const { team_id } = req.query;
        const students = await Students.getByTeam(team_id);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/add_student', async (req, res) => {
    try {
        const { name, email, points } = req.body;
        const student = await Students.addStudent(name, email, points);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/change_student', async (req, res) => {
    try {
        const { student_id, name, email, points } = req.body;
        const student = await Students.changeStudent(student_id, name, email, points);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/delete_student', async (req, res) => {
    try {
        const { student_id } = req.body;
        const student = await Students.deleteStudent(student_id);
    //TODO faire en sorte de re répartir les points
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/add_points_to_student', async (req, res) => {
    try {
        const { student_id, points } = req.body;
        const student = await Students.addPoints(student_id, points);
        //TODO faire en sorte de faire prorata ? 
        //TODO rajouter au nbr total
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/remove_points_to_student', async (req, res) => {
    try {
        const { student_id, points } = req.body;
        const student = await Students.removePoints(student_id, points);
        //TODO enlever au nbr final
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//REQUEST for the points
app.get('/api/points', async (req, res) => {
    try {
        const points = await Points.getAll();
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/points_by_team', async (req, res) => {
    try {
        const { team_id } = req.query;
        const points = await Points.getByTeam(team_id);
        res.json({ points });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/add_points_to_team', async (req, res) => {
    try {
        const { team_id, points } = req.body;
        const point = await Points.addPoints(team_id, points);
        res.json(point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/remove_points_to_team', async (req, res) => {
    try {
        const { team_id, points } = req.body;
        const point = await Points.removePoints(team_id, points);
        res.json(point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//REQUEST for the logs
app.get('/api/logs', async (req, res) => {
    try {
        const logs = await Logs.getAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/logs_by_team', async (req, res) => {
    try {
        const { team_id } = req.query;
        const logs = await Logs.getByTeam(team_id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/logs_by_student', async (req, res) => {
    try {
        const { student_id } = req.query;
        const logs = await Logs.getByStudent(student_id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
