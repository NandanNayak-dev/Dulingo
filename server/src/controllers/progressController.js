import { Progress } from '../models/Progress.js';
import { Lesson } from '../models/Lesson.js';
import { User } from '../models/User.js';

// @desc    Mark a lesson as completed & award XP points idempotently
// @route   POST /api/progress/lessons/:id/complete
// @access  Private
export const completeLesson = async (req, res, next) => {
  try {
    const lessonId = req.params.id;
    const userId = req.user._id;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    let progress = await Progress.findOne({ userId, lessonId });

    if (progress && progress.completed) {
      // Idempotency: prevent double rewards
      return res.json({
        success: true,
        alreadyCompleted: true,
        pointsAwarded: 0,
        totalPoints: req.user.points,
        message: 'Lesson already completed earlier. Review anytime!',
      });
    }

    if (!progress) {
      progress = new Progress({
        userId,
        lessonId,
        completed: true,
        completedAt: new Date(),
        xpEarned: 10,
      });
    } else {
      progress.completed = true;
      progress.completedAt = new Date();
      progress.xpEarned = 10;
    }

    await progress.save();

    // Award 10 XP to user
    const user = await User.findById(userId);
    user.points = (user.points || 0) + 10;
    await user.save({ validateBeforeSave: false });

    // Increment lesson completions count
    lesson.completionCount = (lesson.completionCount || 0) + 1;
    await lesson.save({ validateBeforeSave: false });

    res.json({
      success: true,
      alreadyCompleted: false,
      pointsAwarded: 10,
      totalPoints: user.points,
      streak: user.streak,
      message: '🎉 Congratulations! You completed this lesson and earned +10 Civic XP!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's progress records
// @route   GET /api/progress/me
// @access  Private
export const getMyProgress = async (req, res, next) => {
  try {
    const progressList = await Progress.find({ userId: req.user._id });

    const completedLessonIds = progressList
      .filter((p) => p.completed)
      .map((p) => p.lessonId.toString());

    res.json({
      success: true,
      count: completedLessonIds.length,
      completedLessonIds,
      progressList,
    });
  } catch (error) {
    next(error);
  }
};
