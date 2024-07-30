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
router.get('/factions_teams', teamController.getFactionsTeams);
router.get('/all_teams', teamController.getAllTeams);
router.post('/add_team', teamController.addTeam);
router.put('/change_team', teamController.changeTeam);
router.delete('/delete_team', teamController.deleteTeam);

module.exports = router;
