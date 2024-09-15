const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadCSV } = require('../controllers/csvController');

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: API for processing CSV files
 */

/**
 * @swagger
 * /api/csv/Upload:
 *   post:
 *     summary: Process a CSV file
 *     tags: [CSV]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV file to upload
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: CSV processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error processing CSV
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
router.post('/Upload', upload.single('file'), uploadCSV);

module.exports = router;
