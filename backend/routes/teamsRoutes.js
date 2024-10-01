const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamsController');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing teams
 */

/**
 * @swagger
 * /api/teams/Base:
 *   get:
 *     summary: Retrieve a list of starter teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of starter teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/Base', teamController.getStarterTeams);

/**
 * @swagger
 * /api/teams/Factions:
 *   get:
 *     summary: Retrieve a list of faction teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of faction teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/Factions', teamController.getFactionsTeams);

/**
 * @swagger
 * /api/teams/:
 *   get:
 *     summary: Retrieve a list of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of all teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/', teamController.getAllTeams);

/**
 * @swagger
 * /api/teams/Create:
 *   post:
 *     summary: Add a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team
 *               color:
 *                 type: string
 *                 description: The color of the team
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/Create', teamController.addTeam);

/**
 * @swagger
 * /api/teams/Update:
 *   put:
 *     summary: Update an existing team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team to update
 *               name:
 *                 type: string
 *                 description: The new name of the team
 *               color:
 *                 type: string
 *                 description: The new color of the team
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Invalid input
 */
router.put('/Update', teamController.changeTeam);

/**
 * @swagger
 * /api/teams/Delete:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team to delete
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Invalid input
 */
router.delete('/Delete', teamController.deleteTeam);

/**
 * @swagger
 * /api/teams/GetPoints:
 *   get:
 *     summary: Retrieve points of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams and their points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamPoints'
 */
router.get('/GetPoints', teamController.getPoints);

/**
 * @swagger
 * /api/teams/GetPointsByTeam:
 *   get:
 *     summary: Retrieve points of a specific team
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve points for
 *     responses:
 *       200:
 *         description: Team points retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamPoints'
 *       404:
 *         description: Team not found
 */
router.get('/GetPointsByTeam', teamController.getPointsByTeam);

/**
 * @swagger
 * /api/teams/AddPoints:
 *   put:
 *     summary: Add points to a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team to add points to
 *               points:
 *                 type: integer
 *                 description: The number of points to add
 *     responses:
 *       200:
 *         description: Points added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Team not found
 */
router.put('/AddPoints', teamController.addPoints);

/**
 * @swagger
 * /api/teams/RemovePoints:
 *   put:
 *     summary: Remove points from a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team to remove points from
 *               points:
 *                 type: integer
 *                 description: The number of points to remove
 *     responses:
 *       200:
 *         description: Points removed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Team not found
 */
router.put('/RemovePoints', teamController.removePoints);

/**
 * @swagger
 * /api/teams/RandomTeam:
 *   get:
 *     summary: Assign students randomly to teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Students randomly assigned to teams
 *       500:
 *         description: Error while assigning teams
 */
router.get('/RandomTeam', teamController.randomTeam);

module.exports = router;
