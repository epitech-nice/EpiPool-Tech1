const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.get('/logs', logsController.getAllLogs);
router.get('/logs_by_team', logsController.getLogsByTeam);
router.get('/logs_by_student', logsController.getLogsByStudent);

module.exports = router;
