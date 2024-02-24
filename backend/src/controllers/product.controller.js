import { Product } from "../models/product.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const newProduct = asyncHandler(async (req, res) => {
    const product = req.body;

    // Check for existing product with the same SKU
    const exists = await Product.findOne({ sku: product.sku });
    if (exists) {
        return res.status(400).json(new ApiError(400, 'Product already exists') );
    }

    // Create and save the product
    try {
        const createdProduct = await Product.create(product);
        res.status(201).json(new ApiResponse(201,{ product: createdProduct },'Product Created successfully'));
    } catch (err) {
        res.status(500).send(new ApiError(500, 'Server error'));
        return;
    }
});

// Get all products
const getAllProducts = async (req, res) => {
    // You can implement pagination if needed
    // const pageSize = +req.query.pageSize || 5;
    // const currentPage = +req.query.currentPage || 1;

    // const totalItems = await Product.find().countDocuments();

    // const items = await Product.find()
    //   .skip((currentPage - 1) * pageSize)
    //   .limit(pageSize);

    // res.status(200).json({ items, totalItems });
};

export { newProduct, getAllProducts };

