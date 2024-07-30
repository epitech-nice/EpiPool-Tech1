const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Team = require('../models/Teams');  // Sequelize model for Team
const Student = require('../models/Students');  // Sequelize model for Student

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

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
                    let team;

                    // Check if the team exists or create it
                    team = await Team.findOne({ where: { name: name_team } });
                    if (!team) {
                        team = await Team.create({ name: name_team, color, points: 0 });
                    }

                    if (name && email) {
                        // Handle student entry
                        let student = await Student.findOne({ where: { email } });
                        if (student) {
                            student.points += parseInt(points, 10);
                            await student.save();
                        } else {
                            student = await Student.create({
                                name,
                                email,
                                team_id: team.id,
                                points: parseInt(points, 10)
                            });
                        }
                    } else {
                        team.points += parseInt(points, 10);
                        await team.save();
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
