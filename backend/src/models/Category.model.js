import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
});

export const Category = mongoose.model('Category',categorySchema)