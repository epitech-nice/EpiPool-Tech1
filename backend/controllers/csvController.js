const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Team = require('../models/TeamModel');
const Student = require('../models/StudentModel');

const handleTeam = async (team_name, points, reason) => {
    let team_id;

    if (!team_name) {
        return null;
    }

    const teamResults = await Team.getByName(team_name);
    if (teamResults.length === 0) {
        team_id = await Team.addTeam(team_name, 'default_color');
        console.log(`Team ${team_name} created with ID: ${team_id}`);
    } else {
        team_id = teamResults[0].team_id;
        console.log(`Team ${team_name} found with ID: ${team_id}`);
    }

    if (points) {
        await Team.updatePoints(team_id, points, reason);
        console.log(`${points} points added to team ${team_name}`);
    }

    return team_id;
};

const handleStudent = async (name, email, team_id, points, reason) => {
    if (!email) {
        console.log('Email not provided, skipping student creation');
        return;
    }

    const studentResults = await Student.getStudentByEmail(email);
    if (studentResults.length > 0) {
        const student = studentResults[0];
        console.log(`Student ${student.name} found with ID: ${student.student_id}`);
        
        if (points) {
            await Student.updatePoints(student.student_id, points, reason);
            console.log(`${points} points added to student ${student.name}`);
        }
    } else {
        await Student.addStudent(name || 'Unknown', email, points || 0, team_id);
        console.log(`New student ${name || 'Unknown'} created with ${points || 0} points`);
    }
};

const processCSVRecord = async (record) => {
    const { name, email, team_name, points, reason } = record;

    const cleanName = name ? name.trim() : null;
    const cleanEmail = email ? email.trim() : null;
    const cleanTeamName = team_name ? team_name.trim() : null;
    const cleanPoints = points ? parseInt(points, 10) : 0;
    const cleanReason = reason ? reason.trim() : 'CSV upload';

    const team_id = await handleTeam(cleanTeamName, cleanPoints, cleanReason);

    await handleStudent(cleanName, cleanEmail, team_id, cleanPoints, cleanReason);
};

exports.uploadCSV = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                for (const record of results) {
                    await processCSVRecord(record);
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
