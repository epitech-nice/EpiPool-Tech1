const Student = require('../models/StudentModel');

function generateRandomPositions(totalStudents) {
    const positions = [];
    for (let i = 1; i <= totalStudents; i++) {
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

        if (totalStudents === 0) {
            return res.status(404).json({ message: 'Students not found' });
        }

        const randomPositions = generateRandomPositions(totalStudents);
        const updatedStudents = [];

        for (let i = 0; i < totalStudents; i++) {
            const student = students[i];
            const randomPosition = randomPositions[i];
            
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
