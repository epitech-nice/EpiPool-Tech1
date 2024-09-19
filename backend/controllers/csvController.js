const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Team = require('../models/TeamModel');
const Student = require('../models/StudentModel');


exports.uploadCSV = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                for (const record of results) {
                    const { name, email, name_team, color, points } = record;
                    let team_id;

                    const teamResults = await Team.getByName(name_team);
                    if (teamResults.length === 0) {
                        team_id = await Team.addTeam(name_team, color);
                        await Points.addNewTeam(team_id);
                    } else {
                        team_id = teamResults[0].team_id;
                    }

                    if (name && email) {
                        const studentResults = await Student.getStudentByEmail(email);
                        let student;
                        if (studentResults.length > 0) {
                            student = studentResults[0];
                            await Student.addPoints(student.student_id, points, 'CSV upload');
                        } else {
                            await Student.addStudent(team_id, name, email, points);
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
};
