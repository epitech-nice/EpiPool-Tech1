const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Teams = require('./models/Teams');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Request for the teams
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
