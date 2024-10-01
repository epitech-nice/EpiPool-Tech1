const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/randomPosController');

/**
 * @swagger
 * /random-positions:
 *   get:
 *     summary: Assign random positions to students
 *     description: Assigns random positions to students based on the POSITION_AVAILABLE environment variable.
 *     responses:
 *       200:
 *         description: Random positions successfully assigned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Random positions successfully assigned
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       position:
 *                         type: integer
 *                         example: 5
 *       400:
 *         description: Invalid POSITION_AVAILABLE value.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid POSITION_AVAILABLE value
 *       404:
 *         description: No students found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No students found
 *       500:
 *         description: Error while assigning positions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error while assigning positions
 */
router.get('/', scriptController.randomPositions);

module.exports = router;
