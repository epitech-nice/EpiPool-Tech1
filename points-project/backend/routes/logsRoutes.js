const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API for managing logs
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve a list of all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of all logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
router.get('/logs', logsController.getAllLogs);

/**
 * @swagger
 * /api/logs_by_team:
 *   get:
 *     summary: Retrieve logs by team ID
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve logs for
 *     responses:
 *       200:
 *         description: Logs related to the specified team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       404:
 *         description: Logs not found
 */
router.get('/logs_by_team', logsController.getLogsByTeam);

/**
 * @swagger
 * /api/logs_by_student:
 *   get:
 *     summary: Retrieve logs by student ID
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student to retrieve logs for
 *     responses:
 *       200:
 *         description: Logs related to the specified student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       404:
 *         description: Logs not found
 */
router.get('/logs_by_student', logsController.getLogsByStudent);

/**
 * @swagger
 * /api/addLogs:
 *   post:
 *     summary: Add a new log entry
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       201:
 *         description: Log entry created
 *       401:
 *         description: Unauthorized
 */
router.post('/addLogs', authenticateToken, logsController.addLog);

/**
 * @swagger
 * /api/deleteLogs:
 *   delete:
 *     summary: Delete a log entry
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               log_id:
 *                 type: integer
 *                 description: ID of the log entry to delete
 *     responses:
 *       200:
 *         description: Log entry deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Log entry not found
 */
router.delete('/deleteLogs', authenticateToken, logsController.deleteLog);

module.exports = router;
