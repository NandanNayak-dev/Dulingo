import express from 'express';
import { completeLesson, getMyProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All progress routes require authentication

router.get('/me', getMyProgress);
router.post('/lessons/:id/complete', completeLesson);

export default router;
