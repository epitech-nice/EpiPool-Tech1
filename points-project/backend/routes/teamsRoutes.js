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
 * /api/teams/starter_teams:
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
router.get('/starter_teams', teamController.getStarterTeams);

/**
 * @swagger
 * /api/teams/factions_teams:
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
router.get('/factions_teams', teamController.getFactionsTeams);

/**
 * @swagger
 * /api/teams/all_teams:
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
router.get('/all_teams', teamController.getAllTeams);

/**
 * @swagger
 * /api/teams/add_team:
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
router.post('/add_team', teamController.addTeam);

/**
 * @swagger
 * /api/teams/change_team:
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
router.put('/change_team', teamController.changeTeam);

/**
 * @swagger
 * /api/teams/delete_team:
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
router.delete('/delete_team', teamController.deleteTeam);

module.exports = router;
