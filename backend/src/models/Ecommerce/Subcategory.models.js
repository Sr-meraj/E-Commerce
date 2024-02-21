// Subcategory.js
import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    }
);

export const Subcategory = mongoose.model('Subcategory', subcategorySchema);
