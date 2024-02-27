
import { Brand } from "../models/brand.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || !req.file) {
        return res.status(400).json(new ApiError(400, "", "Name and Brand Image are Required"));
    }

    let brand = await Brand.findOne({ name });

    // Check if the brand already exists in the database
    if (brand) {
        return res.status(409).json(new ApiError(409, '', "This brand already exists"));
    }

    let brandImagePath;

    // If image is uploaded, save it to Cloudinary
    if (req.file) {
        try {
            const result = await uploadOnCloudinary(req.file.path);
            brandImagePath = result.url;
        } catch (err) {
            console.log("error", err);
            return res.status(500).send(new ApiError(500, "Server Error", "Internal Server Error"));
        }
    }

    // Create brand with the provided data and image path
    brand = await Brand.create({ ...req.body, image: brandImagePath });

    return res.status(201).json(new ApiResponse(201, 'Created Successfully', brand));
});

const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(new ApiResponse(201, brands, "brands fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, '', 'Internal Server Error'));
    }
})

const updateBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params;
    const { name } = req.body;
    const brand = await Brand.findById(brandId);
    
    if (!brand) {
        return res.status(404).json(new ApiError(404, "", "Brand not found"));
    }

    // Remove from Cloudinary using the public_id
    if (brand.image) {
        const public_id = brand.image.split("/").pop().split(".")[0];
        await deleteFromCloudinary(public_id);
    }

    let updatedBrandImage = brand.image; // Default to the old brand image

    // Check if "image" exists in req.files
    if (req.file && req.file.path) {
        const result = await uploadOnCloudinary(req.file.path);
        if (result.error) {
            return res.status(500).json(new ApiError(500, "", "Something went wrong while uploading the brand image"));
        }
        updatedBrandImage = result.url;
    }

    try {
        const brandDoc = await Brand.findByIdAndUpdate(
            brandId,
            {
                $set: {
                    name,
                    image: updatedBrandImage,
                },
            },
            { new: true }
        );

        return res.status(201).json(new ApiResponse(201, brandDoc, "Brand updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error', "Internal Server Error"));
    }
});


const deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;

  // Check if the brand exists
  const existingBrand = await Brand.findById(brandId);
  if (!existingBrand) {
    return res.status(404).json(new ApiError(404, "",'Brand not found'));
  }

  // Check if the brand is associated with any products
  const products = await Product.find({ brand: brandId });
  if (products.length > 0) {
    return res.status(409).json(new ApiError(409, "",'Brand is associated with products'));
  }

  try {
    // Delete the brand
    const deletedBrand = await Brand.findByIdAndDelete( brandId );
    
    if (!deletedBrand) {
      return res.status(404).json(new ApiError(404, "",'Brand not found'));
    }

    // Respond with success message
    res.status(200).json(new ApiResponse(200, {}, `${deletedBrand.name} Brand deleted successfully`));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiError(500, "",'Internal Server Error'));
  }
});


export {
    createBrand,
    deleteBrand,
    getAllBrands,
    updateBrand
};

