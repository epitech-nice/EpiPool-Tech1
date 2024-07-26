const express = require('express');
const router = express.Router();
const pointsController = require('../controllers/pointsController');

router.get('/points', pointsController.getAllPoints);
router.get('/points_by_team', pointsController.getPointsByTeam);
router.put('/add_points_to_team', pointsController.addPointsToTeam);
router.put('/remove_points_to_team', pointsController.removePointsFromTeam);

module.exports = router;
