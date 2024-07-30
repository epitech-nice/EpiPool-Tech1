const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinition');
const teamsRoutes = require('./routes/teamsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const pointsRoutes = require('./routes/pointsRoutes');
const logsRoutes = require('./routes/logsRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/teams', teamsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/logs', logsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
