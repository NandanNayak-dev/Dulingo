import { Category } from '../models/Category.js';
import { Lesson } from '../models/Lesson.js';

// @desc    Get all public service categories with lesson counts
// @route   GET /api/categories
// @access  Public
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1 });

    // Aggregate published lesson count per category
    const counts = await Lesson.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$categoryId', count: { $sum: 1 } } },
    ]);

    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id.toString()] = c.count;
    });

    const enriched = categories.map((cat) => ({
      ...cat.toObject(),
      lessonCount: countMap[cat._id.toString()] || 0,
    }));

    res.json({
      success: true,
      count: enriched.length,
      categories: enriched,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category by slug with its published lessons
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const lessons = await Lesson.find({
      categoryId: category._id,
      status: 'published',
    }).select('-transcriptTimed');

    res.json({
      success: true,
      category,
      lessons,
    });
  } catch (error) {
    next(error);
  }
};
