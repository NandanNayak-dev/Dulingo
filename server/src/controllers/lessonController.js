import { Lesson } from '../models/Lesson.js';
import { Progress } from '../models/Progress.js';

// @desc    Get all published lessons with optional category, search, language filtering
// @route   GET /api/lessons
// @access  Public
export const getAllLessons = async (req, res, next) => {
  try {
    const { category, language, search, difficulty } = req.query;

    const query = { status: 'published' };

    if (category) {
      query.categoryId = category;
    }

    if (language) {
      query.language = language;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { explanationText: { $regex: search, $options: 'i' } },
        { nativeExplanationText: { $regex: search, $options: 'i' } },
      ];
    }

    const lessons = await Lesson.find(query)
      .populate('categoryId', 'title slug icon colorHex bgLight')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
export const getLessonById = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate(
      'categoryId',
      'title slug icon colorHex bgLight'
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Increment views asynchronously
    lesson.viewsCount += 1;
    await lesson.save({ validateBeforeSave: false });

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    next(error);
  }
};
