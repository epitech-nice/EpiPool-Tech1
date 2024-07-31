const express = require('express');
const router = express.Router();
const pointsController = require('../controllers/pointsController');

/**
 * @swagger
 * tags:
 *   name: Points
 *   description: API for managing points
 */

/**
 * @swagger
 * /api/points/points:
 *   get:
 *     summary: Retrieve a list of all points
 *     tags: [Points]
 *     responses:
 *       200:
 *         description: A list of all points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Points'
 */
router.get('/points', pointsController.getAllPoints);

/**
 * @swagger
 * /api/points/points_by_team:
 *   get:
 *     summary: Retrieve points by team ID
 *     tags: [Points]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve points for
 *     responses:
 *       200:
 *         description: Points related to the specified team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team_id:
 *                   type: integer
 *                   description: ID of the team
 *                 points:
 *                   type: integer
 *                   description: Points associated with the team
 *       404:
 *         description: Points not found
 */
router.get('/points_by_team', pointsController.getPointsByTeam);

/**
 * @swagger
 * /api/points/add_points_to_team:
 *   put:
 *     summary: Add points to a team
 *     tags: [Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team
 *               points:
 *                 type: integer
 *                 description: The number of points to add
 *     responses:
 *       200:
 *         description: Points successfully added
 *       400:
 *         description: Invalid request parameters
 */
router.put('/add_points_to_team', pointsController.addPointsToTeam);

/**
 * @swagger
 * /api/points/remove_points_to_team:
 *   put:
 *     summary: Remove points from a team
 *     tags: [Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team
 *               points:
 *                 type: integer
 *                 description: The number of points to remove
 *     responses:
 *       200:
 *         description: Points successfully removed
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Team or points not found
 */
router.put('/remove_points_to_team', pointsController.removePointsFromTeam);

module.exports = router;
