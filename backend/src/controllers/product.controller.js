import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const newProduct = asyncHandler(async (req, res) => {
    try {
        const { title, slug, sku, description,shortDescription, price,discountedPrice, stock, category, subcategory, brand } = req.body;

        // Validation
        if (!title || !slug || !sku || !description || !price || !stock || !category) {
            const missingFields = [];
            if (!title) missingFields.push('title');
            if (!slug) missingFields.push('slug');
            if (!sku) missingFields.push('sku');
            if (!description) missingFields.push('description');
            if (!price) missingFields.push('price');
            if (!stock) missingFields.push('stock');
            if (!category) missingFields.push('category');
            return res.status(400).json(new ApiError(400, '',`Fields are required: ${missingFields.join(', ')}`));
        }

        // Check for existing product with the same SKU
        const exists = await Product.findOne({ sku: sku });
        if (exists) {
            return res.status(400).json(new ApiError(400, 'Product already exists','Product already exists'));
        }

        const productImagesLocalPath = req.files?.productImages;

        let imagesUrls = null;
        if (productImagesLocalPath && Array.isArray(productImagesLocalPath)) {
            imagesUrls = productImagesLocalPath.map(image => image.path);
        } else {
            imagesUrls = productImagesLocalPath ? [productImagesLocalPath.path] : null;
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(imagesUrls.map(async (image) => await uploadOnCloudinary(image)));

        const cloudinaryImageUrl = uploadedImages.map((img) => img.url)
        
        if (!cloudinaryImageUrl) {
                throw new ApiError(400, "product image file is required")
            }
        // Save product data to the database
        const createdProduct = await Product.create({
            title,
            slug,
            sku,
            description,
            shortDescription,
            price,
            discountedPrice,
            stock,
            category,
            subcategory,
            brand,
            productImages: cloudinaryImageUrl,
        });

        res.status(201).json(new ApiResponse(201, { ...createdProduct._doc }, 'product'));
    } catch (error) {
        console.error(error);
        new ApiError(500, 'Internal Server Error');
    }
});

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = +req.query.limit || 6;
    const currentPage = +req.query.page || 0;
    const searchParams = req.query.search;

    const queryObj = searchParams ? {title: {$regex : searchParams , $options: "i"}} : {};

    
    const products = await Product.find(queryObj)
    .skip(pageSize * currentPage)
    .limit(pageSize)
    .sort('-createdAt');
    
    const countTotalProducts = await Product.find(queryObj).countDocuments();


    return res.status(200).json(new ApiResponse(200,{products, totalProducts: countTotalProducts},"Products retrieved successfully"));
})




export { newProduct, getAllProducts };

