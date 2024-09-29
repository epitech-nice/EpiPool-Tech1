const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinition');
const teamsRoutes = require('./routes/teamsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const logsRoutes = require('./routes/logsRoutes');
const csvRoutes = require('./routes/csvRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const authMiddleware = require('./middleware/auth.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', authRoutes);
app.use('/api/teams', authMiddleware, teamsRoutes);
app.use('/api/students', authMiddleware, studentsRoutes);
app.use('/api/logs', authMiddleware, logsRoutes);
app.use('/api/csv', authMiddleware, csvRoutes);
app.use('/api/sync', authMiddleware, syncRoutes);
app.use('/api/poolPosition', authMiddleware, require('./routes/positionRoutes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
