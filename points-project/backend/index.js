const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Teams = require('./models/Teams');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/starter_teams', async (req, res) => {
    const teams = await Teams.getStarter();
    res.json(teams);
});

app.get('/api/orders_teams', async (req, res) => {

});

app.get('/api/all_teams', async (req, res) => {

});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
