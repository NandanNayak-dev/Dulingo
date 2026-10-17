import express from 'express';
import {
  register,
  login,
  getMe,
  updateMe,
  logout,
} from '../controllers/authController.js';
import { protect, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);
router.patch('/me', protect, updateMe);

// Role verification test routes (for security validation)
router.get('/verify-role/teacher', protect, requireRole('teacher'), (req, res) => {
  res.json({
    success: true,
    message: `Teacher authorization confirmed for ${req.user.name}.`,
    role: req.user.role,
  });
});

router.get('/verify-role/learner', protect, requireRole('learner'), (req, res) => {
  res.json({
    success: true,
    message: `Learner authorization confirmed for ${req.user.name}.`,
    role: req.user.role,
  });
});

export default router;
