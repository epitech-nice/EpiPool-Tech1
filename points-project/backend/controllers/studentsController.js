// controllers/studentController.js

const Students = require('../models/Students');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Students.getAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentsByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const students = await Students.getByTeam(team_id);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, email, points } = req.body;
        const student = await Students.addStudent(name, email, points);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeStudent = async (req, res) => {
    try {
        const { student_id, name, email, points, team_id } = req.body;
        if (!student_id) {
            return res.status(400).json({ error: 'Student ID is required' });
        }const student = await Students.changeStudent(student_id, name, email, points, team_id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error changing student:', error);
        if (error.message === 'Student not found') {
            res.status(404).json({ error: 'Student not found' });
        } else if (error.message === 'Validation error') {
            res.status(400).json({ error: 'Invalid input data' });
        } else {
            res.status(500).json({ error: 'An error occurred while updating the student' });
        }
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { student_id } = req.body;
        if (!student_id) {
            return res.status(400).json({ error: 'Student ID is required' });
        }
        const student = await Students.findByPk(student_id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const { points, team_id } = student;
        await student.destroy();
        if (team_id && points > 0) {
            const teamMembers = await Students.findAll({ where: { team_id } });
            if (teamMembers.length > 0) {
                const pointsPerMember = Math.floor(points / teamMembers.length);
                let pointsRemainder = points % teamMembers.length;
                for (let member of teamMembers) {
                    let additionalPoints = pointsPerMember;
                    if (pointsRemainder > 0) {
                        additionalPoints += 1;
                        pointsRemainder -= 1;
                    }
                    await member.update({ points: member.points + additionalPoints });
                }
            }
        }
        res.json({ message: 'Student deleted and points redistributed successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
};

exports.addPointsToStudent = async (req, res) => {
    try {
        const { student_id, points } = req.body;
        if (!student_id || typeof points !== 'number') {
            return res.status(400).json({ error: 'Student ID and points are required' });
        }
        const student = await Students.findByPk(student_id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const updatedStudent = await student.update({ points: student.points + points });
        const allStudents = await Students.findAll();
        const teamSizes = allStudents.reduce((acc, student) => {
            acc[student.team_id] = (acc[student.team_id] || 0) + 1;
            return acc;
        }, {});
        const totalTeams = Object.keys(teamSizes).length;
        const totalStudents = allStudents.length;
        const averageTeamSize = totalStudents / totalTeams;
        const teamSize = teamSizes[student.team_id];
        let proratedPoints = points;
        if (teamSize < averageTeamSize) {
            const ratio = teamSize / averageTeamSize;
            proratedPoints = points * ratio;
        }
        const finalStudent = await student.update({ points: student.points + proratedPoints });

        res.json(finalStudent);
    } catch (error) {
        console.error('Error adding points to student:', error);
        res.status(500).json({ error: 'An error occurred while adding points to the student' });
    }
};

exports.removePointsFromStudent = async (req, res) => {
    try {
        const { student_id, points } = req.body;
        if (!student_id || typeof points !== 'number' || points <= 0) {
            return res.status(400).json({ error: 'Valid student ID and a positive number of points are required' });
        }
        const student = await Students.findByPk(student_id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const newPoints = Math.max(0, student.points - points);
        const updatedStudent = await student.update({ points: newPoints });
        const allStudents = await Students.findAll();
        const teamSizes = allStudents.reduce((acc, student) => {
            acc[student.team_id] = (acc[student.team_id] || 0) + 1;
            return acc;
        }, {});
        const totalTeams = Object.keys(teamSizes).length;
        const totalStudents = allStudents.length;
        const averageTeamSize = totalStudents / totalTeams;
        const teamSize = teamSizes[student.team_id];
        let proratedPoints = points;
        if (teamSize < averageTeamSize) {
            const ratio = teamSize / averageTeamSize;
            proratedPoints = points * ratio;
        }
        const finalPoints = Math.max(0, updatedStudent.points - proratedPoints);
        const finalStudent = await student.update({ points: finalPoints });
        res.json(finalStudent);
    } catch (error) {
        console.error('Error removing points from student:', error);
        res.status(500).json({ error: 'An error occurred while removing points from the student' });
    }
};
