// Product.js
import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

mongoose.plugin(slug, options);


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true
    },
    sku: {
      type: String
    },
    description: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
