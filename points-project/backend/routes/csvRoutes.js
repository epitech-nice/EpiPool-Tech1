const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Team = require('../models/Teams');
const Student = require('../models/Students');
const Points = require('../models/Points');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *  name: CSV
 * description: API for processing CSV files
 */

/**
 * @swagger
 * /api/upload_csv:
 * post:
 * summary: Process a CSV file
 * tags: [CSV]
 * requestBody:
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 * required: true
 * responses:
 * 200:
 * description: CSV processed successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * message:
 * type: string
 */
router.post('/upload_csv', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                for (const record of results) {
                    const { name, email, name_team, color, points } = record;
                    const teamResults = await Team.getByName(name_team);
                    console.log("team before", teamResults);
                    if (teamResults.length === 0) {
                        team_id = await Team.addTeam(name_team, color);
                        let point = await Points.addNewTeam(team_id);
                    }
                    console.log("team_id", team_id);
                    if (name && email) {
                        let studentResults = await Student.getStudentByEmail(email);
                        let student;
                        if (studentResults.length > 0) {
                            student = studentResults[0];
                            await Student.addPoints(student.student_id, points, 'CSV upload');
                        } else {
                            student = await Student.addStudent(team_id, name, email, points);
                        }
                    } else {
                        await Points.addPoints(team_id, points, 'CSV upload');
                    }
                }
                res.json({ success: true, message: 'CSV processed successfully' });
            } catch (error) {
                console.error('Error processing CSV:', error);
                res.status(500).json({ success: false, message: 'Error processing CSV' });
            } finally {
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
        });
});

module.exports = router;
