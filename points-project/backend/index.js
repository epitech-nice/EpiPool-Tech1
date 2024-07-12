const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Teams = require('./models/Teams');
const Students = require('./models/Students');
const Points = require('./models/Points');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//REQUEST for the teams
app.get('/api/starter_teams', async (req, res) => {
    const teams = await Teams.getStarter();
    res.json(teams);
});

app.get('/api/factions_teams', async (req, res) => {
    const teams = await Teams.getFactions();
    res.json(teams);
});

app.get('/api/all_teams', async (req, res) => {
    const teams = await Teams.getAll();
    res.json(teams);
});

app.post('/api/add_team', async (req, res) => {
    const { name, color } = req.body;
    const team = await Teams.addTeam(name, color);
    res.json(team);
});

app.put('/api/change_team', async (req, res) => {
    const { team_id, name, color } = req.body;
    const team = await Teams.changeTeam(team_id, name, color);
    res.json(team);
});

app.delete('/api/delete_team', async (req, res) => {
    const { team_id } = req.body;
    const team = await Teams.deleteTeam(team_id);
    res.json(team);
});

//REQUEST for the students
app.get('/api/all_students', async (req, res) => {
    const students = await Students.getAll();
    res.json(students);
});

app.get('/api/students_by_team', async (req, res) => {
    const { team_id } = req.body;
    const students = await Students.getByTeam(team_id);
    res.json(students);
});

app.post('/api/add_student', async (req, res) => {
    const { name, email, points } = req.body;
    const student = await Students.addStudent(name, email, points);
    res.json(student);
});

app.put('/api/change_student', async (req, res) => {
    const { student_id, name, email, points } = req.body;
    const student = await Students.changeStudent(student_id, name, email, points);
    res.json(student);
});

app.delete('/api/delete_student', async (req, res) => {
    const { student_id } = req.body;
    const student = await Students.deleteStudent(student_id);
    //TODO faire en sorte de re répartir les points
    res.json(student);
});

app.put('/api/add_points_to_student', async (req, res) => {
    const { student_id, points } = req.body;
    const student = await Students.addPoints(student_id, points);
    //TODO faire en sorte de faire prorata ? 
    //TODO rajouter au nbr total
    res.json(student);
});

app.put('/api/remove_points_to_student', async (req, res) => {
    const { student_id, points } = req.body;
    const student = await Students.removePoints(student_id, points);
    //TODO enlever au nbr final
    res.json(student);
});

//REQUEST for the points
app.get('/api/points', async (req, res) => {
    const points = await Points.getAll();
    res.json(points);
});

app.get('/api/points_by_team', async (req, res) => {
    const { team_id } = req.body;
    const points = await Points.getByTeam(team_id);
    res.json(points);
});

app.put('/api/add_points_to_team', async (req, res) => {
    const { team_id, points } = req.body;
    const point = await Points.addPoints(team_id, points);
    res.json(point);
});

app.put('/api/remove_points_to_team', async (req, res) => {
    const { team_id, points } = req.body;
    const point = await Points.removePoints(team_id, points);
    res.json(point);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
