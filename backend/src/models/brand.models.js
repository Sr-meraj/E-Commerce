// Brand.js
import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brandImage: {
    type: String,
    required: true,
  },
});

export const Brand = mongoose.model('Brand', brandSchema);
