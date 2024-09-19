const express = require('express');
const router = express.Router();
const { syncStudentsFromIntra } = require('../controllers/syncController');
require('dotenv').config({ path: '../../.env' });

/**
 * @swagger
 * tags:
 *   name: Sync
 *   description: API for syncing data
 */

/**
 * @swagger
 * /api/sync/Students:
 *   post:
 *     summary: Sync students from the Intra API
 *     tags: [Sync]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Students synced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       500:
 *         description: Error syncing data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.post('/Students', syncStudentsFromIntra);

module.exports = router;