import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true
    },
    sku: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      }
    ]
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
