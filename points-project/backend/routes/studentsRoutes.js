const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */

/**
 * @swagger
 * /api/all_students:
 *   get:
 *     summary: Retrieve a list of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/all_students', studentController.getAllStudents);

/**
 * @swagger
 * /api/students_by_team:
 *   get:
 *     summary: Retrieve students by team ID
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve students for
 *     responses:
 *       200:
 *         description: Students belonging to the specified team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Students not found
 */
router.get('/students_by_team', studentController.getStudentsByTeam);

/**
 * @swagger
 * /api/add_student:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student
 *               email:
 *                 type: string
 *                 description: The email of the student
 *               points:
 *                 type: integer
 *                 description: The initial points for the student
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/add_student', studentController.addStudent);

/**
 * @swagger
 * /api/change_student:
 *   put:
 *     summary: Update a student's details
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: The ID of the student to update
 *               name:
 *                 type: string
 *                 description: The updated name of the student
 *               email:
 *                 type: string
 *                 description: The updated email of the student
 *               points:
 *                 type: integer
 *                 description: The updated points of the student
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
router.put('/change_student', studentController.changeStudent);

/**
 * @swagger
 * /api/delete_student:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: The ID of the student to delete
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/delete_student', studentController.deleteStudent);

/**
 * @swagger
 * /api/add_points_to_student:
 *   put:
 *     summary: Add points to a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: The ID of the student
 *               points:
 *                 type: integer
 *                 description: The number of points to add
 *     responses:
 *       200:
 *         description: Points added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 */
router.put('/add_points_to_student', studentController.addPointsToStudent);

/**
 * @swagger
 * /api/remove_points_from_student:
 *   put:
 *     summary: Remove points from a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: The ID of the student
 *               points:
 *                 type: integer
 *                 description: The number of points to remove
 *     responses:
 *       200:
 *         description: Points removed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 */
router.put('/remove_points_from_student', studentController.removePointsFromStudent);

/**
 * @swagger
 * /api/getChampionByTeam:
 *   get:
 *     summary: Retrieve the champion of a team
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: team_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to retrieve the champion for
 *     responses:
 *       200:
 *         description: The champion of the specified team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Champion not found
 */
router.get('/getChampionByTeam', studentController.getChampionByTeam);
module.exports = router;
