const express = require('express');
const { saveProgress, getLeaderboard } = require('../controller/progressController.js');

const router = express.Router();

router.post('/save', saveProgress);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
