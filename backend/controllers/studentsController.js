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
        const { name, email, points, team_id } = req.body;
        const student = await Students.addStudent(name, email, points, team_id);
        res.json({success: true, message: `Student ${name} added to team ${team_id}`});
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

        const { points, team_id } = student;

        const deleted_student = await Students.destroy({ where: { student_id } });

        const students = await Students.findAll({ where: { team_id } });
        const nb_students_in_team = students.length;
        if (nb_students_in_team > 0) {
            const points_to_give = Math.floor(points / nb_students_in_team);
            const remainder_points = points % nb_students_in_team;

            await Promise.all(students.map(async (student, index) => {
                let extra_points = points_to_give;
                if (index < remainder_points) extra_points += 1;
                await Students.update(
                    { points: student.points + extra_points },
                    { where: { student_id: student.student_id } }
                );
            }));
        }
        res.json({ message: 'Student deleted successfully', deleted_student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPointsToStudent = async (req, res) => {
    try {
        const { student_id, points, reason } = req.body;
        const user_id = req.user;
        const setReason = reason || "PEDAGO";
        const result = await Students.addPoints(student_id, points, setReason, user_id);
        res.json({ success: true, message: `Added ${points} points, because of "${reason}"` });
    } catch (error) {
        console.error("Error adding points:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.removePointsFromStudent = async (req, res) => {
    try {
        const { student_id, points, reason } = req.body;
        if (!reason)
            reason = "PEDAGO";
        const user_id = req.user;
        const student = await Students.removePoints(student_id, points, reason, user_id);
        // TODO: Adjust the final number of points
        res.json({ success: true, message: `Removed ${points} points, because of "${reason}"` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChampionByTeam = async (req, res) => {
    try {
        const champion = await Students.getChampionByTeam();
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
        res.json({success: true, message: `The student changed team !`});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getStudentPositions = async (req, res) => {
    try {
        const students = await Students.findAll({
            attributes: ['student_id', 'name', 'position']
        });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        return res.status(200).json({
            message: 'Student positions retrieved successfully',
            students: students
        });
    } catch (error) {
        console.error(`Error retrieving student positions: ${error.message}`);
        return res.status(500).json({ error: 'Error retrieving student positions' });
    }
};
