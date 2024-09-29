const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');

router.get('/', scriptController.runPythonScript);

module.exports = router;
