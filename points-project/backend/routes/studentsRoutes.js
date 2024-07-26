const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

router.get('/all_students', studentController.getAllStudents);
router.get('/students_by_team', studentController.getStudentsByTeam);
router.post('/add_student', studentController.addStudent);
router.put('/change_student', studentController.changeStudent);
router.delete('/delete_student', studentController.deleteStudent);
router.put('/add_points_to_student', studentController.addPointsToStudent);
router.put('/remove_points_from_student', studentController.removePointsFromStudent);

module.exports = router;
