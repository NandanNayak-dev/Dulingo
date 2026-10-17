import express from 'express';
import { getAllLessons, getLessonById } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getAllLessons);
router.get('/:id', getLessonById);

export default router;
