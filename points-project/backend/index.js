const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Teams = require('./models/Teams');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// sequelize.sync().then(() => {
//     console.log('Database & tables created!');
// });

// app.get('/api/buttons', async (req, res) => {
//     const buttons = await Button.findAll();
//     res.json(buttons);
// });

// app.post('/api/buttons', async (req, res) => {
//     const { label } = req.body;
//     const button = await Button.create({ label });
//     res.json(button);
// });

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
