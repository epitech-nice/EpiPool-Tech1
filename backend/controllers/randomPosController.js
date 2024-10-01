const Student = require('../models/StudentModel');
require('dotenv').config();

function generateRandomPositions(maxPosition) {
    const positions = [];
    for (let i = 1; i <= maxPosition; i++) {
        positions.push(i);
    }
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return positions;
}

exports.randomPositions = async (req, res) => {
    try {
        const students = await Student.findAll();
        const totalStudents = students.length;

        const maxPosition = parseInt(process.env.POSITION_AVAILABLE, 10);
        
        if (isNaN(maxPosition) || maxPosition <= 0) {
            return res.status(400).json({ message: 'Invalid POSITION_AVAILABLE value' });
        }

        if (totalStudents === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        const randomPositions = generateRandomPositions(maxPosition);
        const updatedStudents = [];

        for (let i = 0; i < totalStudents; i++) {
            const student = students[i];
            const randomPosition = randomPositions[i % maxPosition];
            
            await Student.update(
                { position: randomPosition },
                { where: { student_id: student.student_id } }
            );

            updatedStudents.push({
                student_id: student.student_id,
                name: student.name,
                position: randomPosition
            });
        }

        return res.status(200).json({
            message: 'Random positions successfully assigned',
            students: updatedStudents
        });
    } catch (error) {
        console.error(`Error when assigning positions: ${error.message}`);
        return res.status(500).json({ error: 'Error while assigning positions' });
    }
};
