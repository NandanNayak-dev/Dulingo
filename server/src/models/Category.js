import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      default: 'BookOpen',
    },
    tag: {
      type: String,
      default: 'Essential Service',
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
    },
    colorHex: {
      type: String,
      default: '#10b981',
    },
    bgLight: {
      type: String,
      default: '#ecfdf5',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model('Category', categorySchema);
