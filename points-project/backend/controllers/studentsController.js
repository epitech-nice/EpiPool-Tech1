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
        const { student_id, name, email, points } = req.body;
        const student = await Students.changeStudent(student_id, name, email, points);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { student_id } = req.body;
        const student = await Students.deleteStudent(student_id);
        // TODO: Redistribute the student's points to their team
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPointsToStudent = async (req, res) => {
    try {
        const { student_id, points } = req.body;
        const student = await Students.addPoints(student_id, points);
        // TODO: Handle prorata or add to total number
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removePointsFromStudent = async (req, res) => {
    try {
        const { student_id, points } = req.body;
        const student = await Students.removePoints(student_id, points);
        // TODO: Adjust the final number of points
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
