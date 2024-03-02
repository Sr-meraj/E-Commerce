import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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
// const getAllProducts = asyncHandler(async (req, res) => {
//     const pageSize = +req.query.limit || 6;
//     const currentPage = +req.query.page || 0;
//     const searchParams = req.query.search;

//     const queryObj = searchParams
//         ? {
//             $or: [
//                 { title: { $regex: searchParams, $options: "i" } },
//                 { sku: { $regex: searchParams, $options: "i" } },
//                 { slug: { $regex: searchParams, $options: "i" } },
//             ],
//         }
//         : {};
    
//     const products = await Product.find(queryObj)
//         .skip(pageSize * currentPage)
//         .limit(pageSize)
//         .sort('-createdAt');
    
//     const countTotalProducts = await Product.find(queryObj).countDocuments();


//     return res.status(200).json(new ApiResponse(200, { products, totalProducts: countTotalProducts }, "Products retrieved successfully"));
// });

// const getAllProducts = asyncHandler(async (req, res) => {
//     const pageSize = +req.query.limit || 6;
//     const currentPage = +req.query.page || 0;
//     const searchParams = req.query.search;
//     // Create a query object for search conditions
//     const searchQuery = searchParams
//         ? {
//               $or: [
//                   { title: { $regex: searchParams, $options: "i" } },
//                   { sku: { $regex: searchParams, $options: "i" } },
//                   { slug: { $regex: searchParams, $options: "i" } },
//               ],
//           }
//         : {};

//     // Combine search conditions with the aggregation pipeline
//     const pipeline = [
//         {
//             $match: searchQuery,
//         },
//         {
//             $lookup: {
//                 from: "categories",
//                 localField: "category",
//                 foreignField: "_id",
//                 as: "category",
//             },
//         },
//         {
//             $addFields: {
//                 category: {
//                     $first: "$category",
//                 },
//             },
//         },
//         {
//             $lookup: {
//                 from: "categories",
//                 localField: "subcategory",
//                 foreignField: "_id",
//                 as: "subcategory",
//             },
//         },
//         {
//             $addFields: {
//                 subcategory: {
//                     $first: "$subcategory",
//                 },
//             },
//         },
//         {
//             $lookup: {
//                 from: "brands",
//                 localField: "brand",
//                 foreignField: "_id",
//                 as: "brand",
//             },
//         },
//         {
//             $addFields: {
//                 brand: {
//                     $first: "$brand",
//                 },
//             },
//         },
//         {
//             $skip: pageSize * currentPage,
//         },
//         {
//             $limit: pageSize,
//         },
//         {
//             $sort: { createdAt: -1 },
//         },
//     ];

//     // Execute the aggregation pipeline
//     const products = await Product.aggregate(pipeline);

//     // Count the total number of products based on search conditions
//     const countTotalProducts = await Product.find(searchQuery).countDocuments();

//     // Send the response with a 200 status code and the products
//     res.status(200).json(new ApiResponse(200, { products, totalProducts: countTotalProducts }, "Products retrieved successfully"));
// });
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = +req.query.limit || 6;
    const currentPage = +req.query.page || 0;
    const searchParams = req.query.search;
    const sortField = req.query.sort || 'createdAt'; // Default sort field is 'createdAt'
    const sortOrder = req.query.order === 'asc' ? 1 : -1; // Default sort order is descending

    // Create a query object for search conditions
    const searchQuery = searchParams
        ? {
              $or: [
                  { title: { $regex: searchParams, $options: "i" } },
                  { sku: { $regex: searchParams, $options: "i" } },
                  { slug: { $regex: searchParams, $options: "i" } },
              ],
          }
        : {};

    // Combine search conditions with the aggregation pipeline
    const pipeline = [
        {
            $match: searchQuery,
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $addFields: {
                category: {
                    $first: "$category",
                },
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "subcategory",
                foreignField: "_id",
                as: "subcategory",
            },
        },
        {
            $addFields: {
                subcategory: {
                    $first: "$subcategory",
                },
            },
        },
        {
            $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand",
            },
        },
        {
            $addFields: {
                brand: {
                    $first: "$brand",
                },
            },
        },
        {
            $sort: { [sortField]: sortOrder },
        },
        {
            $skip: pageSize * currentPage,
        },
        {
            $limit: pageSize,
        },
    ];

    // Execute the aggregation pipeline
    const products = await Product.aggregate(pipeline);

    // Count the total number of products based on search conditions
    const countTotalProducts = await Product.find(searchQuery).countDocuments();

    // Send the response with a 200 status code and the products
    res.status(200).json(new ApiResponse(200, { products, totalProducts: countTotalProducts }, "Products retrieved successfully"));
});


// const getProductById = asyncHandler(async (req, res) => {
//     try {
//         const prodId = req.params.id;

//         // Find the product by ID
//         const product = await Product.findById(prodId);

//         if (!product) {
//             // If the product is not found, throw an ApiError with a 404 status code
//             res.status(404).json(new ApiError(404, null, 'No product found'));
//         }

//         // Aggregate with category, subcategory and brand to include them in the response
//         const singleProduct = await Product.aggregate([
//             {
//                 $match: {
//                     _id: new mongoose.Types.ObjectId(prodId) // Convert string to ObjectId
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "category",
//                     foreignField: "_id",
//                     as: "category"
//                 }
//             },
//             {
//                 $addFields: {
//                     category: {
//                         $first: "$category"
//                     }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "subcategory",
//                     foreignField: "_id",
//                     as: "subcategory"
//                 }
//             },
//             {
//                 $addFields: {
//                     subcategory: {
//                         $first: "$subcategory"
//                     }
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "brands",
//                     localField: "brand",
//                     foreignField: "_id",
//                     as: "brand"
//                 }
//             },
//             {
//                 $addFields: {
//                     brand: {
//                         $first: "$brand"
//                     }
//                 }
//             }
//         ]
//         );


//         // Send the response with a 200 status code and the product
//         res.status(200).json(new ApiResponse(200, singleProduct, 'Product fetched by id'));
//     } catch (error) {
//         // Handle any errors that occurred during the process
//         res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message));
//     }
// });

// product update

const getProduct = asyncHandler(async (req, res) => {
    try {
        let query;

        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            // If the parameter is a valid ObjectId, search by ID
            query = { _id: new mongoose.Types.ObjectId(req.params.id) };
        } else {
            // If the parameter is not a valid ObjectId, search by slug
            query = { slug: req.params.id };
        }

        const singleProduct = await Product.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $addFields: {
                    category: {
                        $first: "$category"
                    }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "subcategory",
                    foreignField: "_id",
                    as: "subcategory"
                }
            },
            {
                $addFields: {
                    subcategory: {
                        $first: "$subcategory"
                    }
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $addFields: {
                    brand: {
                        $first: "$brand"
                    }
                }
            }
        ]);

        if (!singleProduct || singleProduct.length === 0) {
            // If the product is not found, throw an ApiError with a 404 status code
            return res.status(404).json(new ApiError(404, null, 'No product found'));
        }

        // Use populate to replace the ObjectId references with actual document values
        await Product.populate(singleProduct, [
            { path: 'category', select: 'name' },
            { path: 'subcategory', select: 'name' },
            { path: 'brand', select: 'name' }
        ]);
        
        // Send the response with a 200 status code and the product
        res.status(200).json(new ApiResponse(200, singleProduct[0], 'Product fetched successfully'));
    } catch (error) {
        // Handle any errors that occurred during the process
        res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message));
    }
});


const productUpdate = asyncHandler(async (req, res) => {
    const prodId = req.params.id;

    // Find the product by ID
    let product = await Product.findById(prodId);

    // Make sure the product exists
    if (!product) {
        return res.status(404).json(new ApiError(404, null, 'No product found'));
    }

    // Remove from Cloudinary using the public_id only if new images are provided
    if (req.files && req.files.productImages && product.productImages.length > 0) {
        const deletePromises = product.productImages.map(async (url) => {
            const public_id = url.split("/").pop().split(".")[0];
            await deleteFromCloudinary(public_id);
        });
        await Promise.all(deletePromises);
    }

    let newProductImages;
    // Check if "productImages" exists in req.files
    if (req.files && req.files.productImages) {
        const uploadPromises = req.files.productImages.map(async (file) => {
            const result = await uploadOnCloudinary(file.path);
            if (result.error) {
                return res.status(500).json(new ApiError(500, "", "Something went wrong while uploading product images"));
            }
            return result.url;
        });

        newProductImages = await Promise.all(uploadPromises);
    }

    // Update other fields in the product
    const updatedProductData = { ...req.body, productImages: newProductImages };

    // Update product data excluding productImages if new images are not provided
    const updatedProduct = await Product.findByIdAndUpdate(
        prodId,
        {...updatedProductData},
        { new: true, runValidators: true, upsert: false }
    );

    // Send the response with a 200 status code and the updated product
    res.status(200).json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
});

// delete the product controller 
const deleteProduct = asyncHandler(async (req, res) => {
    const prodId = req.params.id;

    try {
        // Find the product by id from the database
        const product = await Product.findById(prodId);

        // If no product is found, throw an error
        if (!product) {
            throw new ApiError(404, null, 'No product found with that Id');
        }

        // Delete the image associated with this product from cloudinary
        const deletePromises = product.productImages.map(async (url) => {
            const public_id = url.split("/").pop().split(".")[0];
            await deleteFromCloudinary(public_id);
        });
        await Promise.all(deletePromises);

        // Delete the product from the database
        await Product.findByIdAndDelete(prodId);

        // Send the response with a 204 status code and success message
        res.status(204).json(new ApiResponse(204, '', 'Product has been deleted Successfully!'));
    } catch (error) {
        // Handle any errors that occurred during the process
        res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message));
    }
});


export { newProduct, getAllProducts, getProduct, productUpdate, deleteProduct };

