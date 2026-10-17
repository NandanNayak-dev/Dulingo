import express from 'express';
import {
  getTeacherLessons,
  createTeacherLesson,
  updateTeacherLesson,
  togglePublishLesson,
  deleteTeacherLesson,
} from '../controllers/teacherController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Teacher routes are strictly protected by JWT and 'teacher' role check
router.use(protect, requireRole('teacher'));

router.get('/lessons', getTeacherLessons);
router.post('/lessons', createTeacherLesson);
router.patch('/lessons/:id', updateTeacherLesson);
router.post('/lessons/:id/publish', togglePublishLesson);
router.delete('/lessons/:id', deleteTeacherLesson);

export default router;
