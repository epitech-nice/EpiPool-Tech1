const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const teamsRoutes = require('./routes/teamsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const pointsRoutes = require('./routes/pointsRoutes');
const logsRoutes = require('./routes/logsRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', teamsRoutes);
app.use('/api', studentsRoutes);
app.use('/api', pointsRoutes);
app.use('/api', logsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
