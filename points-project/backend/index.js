const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Button = require('./models/Button');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

app.get('/api/buttons', async (req, res) => {
    const buttons = await Button.findAll();
    res.json(buttons);
});

app.post('/api/buttons', async (req, res) => {
    const { label } = req.body;
    const button = await Button.create({ label });
    res.json(button);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

une table avec rouge vert bleu et jaune (un id chacun)
table joueur equipe id, point
table point , equipe id et nbr de pts