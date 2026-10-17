import mongoose from 'mongoose';

const timedTranscriptSchema = new mongoose.Schema({
  seconds: { type: Number, required: true },
  text: { type: String, required: true },
  nativeText: { type: String, default: '' },
});

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Lesson must belong to a category'],
    },
    language: {
      type: String,
      enum: ['en', 'kn', 'hi', 'ta'],
      default: 'en',
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    estimatedMinutes: {
      type: Number,
      default: 3,
    },
    explanationText: {
      type: String,
      required: [true, 'Lesson explanation text is required'],
    },
    nativeExplanationText: {
      type: String,
      default: '',
    },
    keyPoints: [
      {
        type: String,
        trim: true,
      },
    ],
    officialSourceUrl: {
      type: String,
      default: '',
    },
    officialDepartment: {
      type: String,
      default: 'Government of Karnataka',
    },
    lastVerifiedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    audioUrl: {
      type: String,
      default: '',
    },
    transcriptTimed: [timedTranscriptSchema],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    completionCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for category and status querying
lessonSchema.index({ categoryId: 1, status: 1 });
lessonSchema.index({ language: 1, status: 1 });

export const Lesson = mongoose.model('Lesson', lessonSchema);
