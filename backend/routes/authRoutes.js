const express = require('express');
const { check } = require('express-validator');
const { register, login, logout, update, getPoints, getChampion } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management API
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
///////////////////////*For Security reason comment this route*///////////////////////
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('name', 'Name is required').not().isEmpty(),
  ],
  register
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

/**
 * @swagger
 * /api/update:
 *   put:
 *     summary: Update a user's details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/update', authMiddleware, update);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', authMiddleware, logout);

/**
 * @swagger
 * /api/teamPoints:
 *   get:
 *     summary: Retrieve points for the user's team
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Points retrieved successfully
 *       404:
 *         description: Team not found
 */
router.get('/teamPoints', getPoints);

/**
 * @swagger
 * /api/getChampionByTeam:
 *   get:
 *     summary: Retrieve the champion of a team
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve the champion for
 *     responses:
 *       200:
 *         description: The champion of the specified team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Champion not found
 */
router.get('/getChampionByTeam', getChampion);

module.exports = router;
