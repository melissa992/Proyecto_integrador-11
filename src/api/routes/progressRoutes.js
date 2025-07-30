import express from 'express';
import { saveProgress, getLeaderboard } from '../controllers/progressController.js';

const router = express.Router();

router.post('/save', saveProgress);
router.get('/leaderboard', getLeaderboard);

export default router;
