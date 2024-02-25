
import { Category } from "../models/Category.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createCategory = asyncHandler(async (req, res) => {
    const { name, parentCategoryId } = req.body;
    
    if (!name) {
        res.status(400).json(new ApiError(400, "Category Required"))
    }

    try {
        const newCategory = await Category.create({
            name,
            parentCategory: parentCategoryId || null,
        });

        res.status(201).json(new ApiResponse(201, newCategory, "Category created successfully"));
        
    } catch (error) {
        res.status(400).json(new ApiError(400, 'Bad Request'));
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(201, categories, "Categories fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json(new ApiError(404, 'Category not found'));
        }
        res.status(200).json(new ApiResponse(200, category, "Categories fetched successfully"));
      
    } catch (error) {
        res.status(500).json(new ApiError(500, 'Internal Server Error'));

    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, parentCategoryId } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {
                name,
                parentCategory: parentCategoryId || null
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json(new ApiError(404, 'Category not found'));
        }

        return res.status(200).json(new ApiResponse(200, updatedCategory, "Category Updated successfully"));
      
    } catch (error) {
        res.status(400).json(new ApiError(400, 'Bad Request'));
    }
});


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
};

