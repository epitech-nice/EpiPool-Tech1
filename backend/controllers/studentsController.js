const Students = require('../models/StudentModel');

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

exports.getStudent = async (req, res) => {
    try {
        const { student_id } = req.query;
        const student = await Students.getStudent(student_id);
        if (!student)
            return res.status(404).json({ error: 'Student not found' });
        res.json(student);
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
        const { student_id } = req.query;
        const [student, meta] = await Students.getStudent(student_id)
        if (!student)
            return res.status(404).json({ error: 'Student not found' });
        const points = student.points;
        const team_id = student.team_id;
        const deleted_student = await Students.deleteStudent(student_id);
        const students = await Students.getByTeam(team_id);
        const nb_students_in_team = students.length
        if (nb_students_in_team > 0) {
            const points_to_give = Math.floor(points / nb_students_in_team);
            const remainder_points = points % nb_students_in_team;
            await Promise.all(students.map(async (student, index) => {
                let extra_points = points_to_give;
                if (index < remainder_points)
                    extra_points += 1;
                await Students.addPoints(student.student_id, extra_points);
            }));
        }
        res.json(deleted_student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPointsToStudent = async (req, res) => {
    try {
        const { student_id, points, reason } = req.body;
        if (!reason)
            reason = "PEDAGO";
        const student = await Students.addPoints(student_id, points, reason);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removePointsFromStudent = async (req, res) => {
    try {
        const { student_id, points, reason } = req.body;
        if (!reason)
            reason = "PEDAGO";
        const student = await Students.removePoints(student_id, points, reason);
        // TODO: Adjust the final number of points
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChampionByTeam = async (req, res) => {
    try {
        const { team_id } = req.query;
        const champion = await Students.getChampionByTeam(team_id);
        if (!champion)
            return res.status(404).json({ error: 'Champion not found' });
        res.json(champion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeTeam = async (req, res) => {
    try {
        const { student_id, team_id } = req.body;
        const student = await Students.changeTeam(student_id, team_id);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
