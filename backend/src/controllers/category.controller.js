
import mongoose from "mongoose";
import { Category } from "../models/Category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, parentCategoryId } = req.body;

    if (!name) {
        return res.status(400).json(new ApiError(400, "Category Required"));
    }

    try {
        let category = await Category.findOne({ slug: slug });

        if (category) {
            return res.status(409).json(new ApiError(409,'', "Category Already Exists"));
        }

        const newCategory = await Category.create({
            name,
            slug,
            parentCategory: parentCategoryId ? await Category.findById(parentCategoryId) : null,
        });

        res.status(201).json(new ApiResponse(201, newCategory, "Category created successfully"));

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json(new ApiError(500, 'Internal Server Error', 'Internal Server Error'));
    }
});


const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({parentCategory:null}).select("-parentCategory");
        res.status(200).json(new ApiResponse(201, categories, "Categories fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
});

const subCategories = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const result = await Category.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(categoryId) }
            },
            {
                $lookup: {
                    from: 'categories', localField: '_id', foreignField: "parentCategory", as: "subcategories"
                }
            },
            {
                $project: {
                    name: 1,
                    slug:1,
                    subcategories: 1
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json(new ApiError(404, 'Category not found'));
        }

        // Extract parent category and subcategories from the result

        const [parentCategory] = result

        // Include the parent category and subcategories in the response
        const response = {
           ...parentCategory
        };

        res.status(200).json(new ApiResponse(200, response, 'SubCategories fetched successfully'));

    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
});


const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name,slug, parentCategoryId } = req.body;

    const categoryExist = await Category.findOne({ _id: categoryId })
    
    if (!categoryExist) {
        return res.status(404).json(new ApiError(404, 'Category not found','Category not found'));
    }
    
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {
                $set: {
                    name,
                    slug,
                    parentCategory: parentCategoryId || null
                }
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

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Check if the category exists
        const existingCategory = await Category.findById({_id: categoryId});
        if (!existingCategory) {
            return res.status(404).json(new ApiError(404, "",'Category not found'));
        }

        // Delete the category
        const deletedCategory = await Category.findByIdAndDelete({_id: categoryId});
        if (!deletedCategory) {
            return res.status(404).json(new ApiError(404, "",'Category not found'));
        }

        // Respond with success message
        res.status(200).json(new ApiResponse(200, {}, `${deletedCategory.name} Category Deleted Successfully`));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "",'Internal Server Error'));
    }
});


export {
    createCategory,
    deleteCategory,
    getAllCategories,
    subCategories,
    updateCategory
};

