import { Lesson } from '../models/Lesson.js';
import { Category } from '../models/Category.js';

// @desc    Get all lessons for teacher dashboard (both drafts & published)
// @route   GET /api/teacher/lessons
// @access  Private (Teacher)
export const getTeacherLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find()
      .populate('categoryId', 'title slug icon colorHex bgLight')
      .populate('authorId', 'name email')
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

// @desc    Create a new lesson
// @route   POST /api/teacher/lessons
// @access  Private (Teacher)
export const createTeacherLesson = async (req, res, next) => {
  try {
    const {
      title,
      categoryId,
      language,
      difficulty,
      estimatedMinutes,
      explanationText,
      nativeExplanationText,
      keyPoints,
      officialSourceUrl,
      officialDepartment,
      status,
    } = req.body;

    if (!title || !categoryId || !explanationText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide lesson title, category, and explanation text.',
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category specified.',
      });
    }

    const lesson = await Lesson.create({
      title: title.trim(),
      categoryId,
      language: language || 'en',
      difficulty: difficulty || 'beginner',
      estimatedMinutes: estimatedMinutes || 3,
      explanationText: explanationText.trim(),
      nativeExplanationText: nativeExplanationText?.trim() || '',
      keyPoints: Array.isArray(keyPoints) ? keyPoints : [],
      officialSourceUrl: officialSourceUrl?.trim() || '',
      officialDepartment: officialDepartment?.trim() || 'Government of Karnataka',
      status: status === 'published' ? 'published' : 'draft',
      authorId: req.user._id,
      lastVerifiedDate: new Date(),
    });

    const populated = await Lesson.findById(lesson._id).populate('categoryId', 'title slug icon');

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully in teacher workshop.',
      lesson: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing lesson
// @route   PATCH /api/teacher/lessons/:id
// @access  Private (Teacher)
export const updateTeacherLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    const allowedUpdates = [
      'title',
      'categoryId',
      'language',
      'difficulty',
      'estimatedMinutes',
      'explanationText',
      'nativeExplanationText',
      'keyPoints',
      'officialSourceUrl',
      'officialDepartment',
      'status',
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        lesson[field] = req.body[field];
      }
    });

    lesson.lastVerifiedDate = new Date();
    await lesson.save();

    const populated = await Lesson.findById(lesson._id).populate('categoryId', 'title slug icon');

    res.json({
      success: true,
      message: 'Lesson updated successfully.',
      lesson: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle lesson publication status (draft <-> published)
// @route   POST /api/teacher/lessons/:id/publish
// @access  Private (Teacher)
export const togglePublishLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    lesson.status = lesson.status === 'published' ? 'draft' : 'published';
    lesson.lastVerifiedDate = new Date();
    await lesson.save();

    res.json({
      success: true,
      message: `Lesson is now ${lesson.status}.`,
      status: lesson.status,
      lesson,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lesson
// @route   DELETE /api/teacher/lessons/:id
// @access  Private (Teacher)
export const deleteTeacherLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.json({
      success: true,
      message: 'Lesson deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
