const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamsController');

router.get('/starter_teams', teamController.getStarterTeams);
router.get('/factions_teams', teamController.getFactionsTeams);
router.get('/all_teams', teamController.getAllTeams);
router.post('/add_team', teamController.addTeam);
router.put('/change_team', teamController.changeTeam);
router.delete('/delete_team', teamController.deleteTeam);

module.exports = router;
