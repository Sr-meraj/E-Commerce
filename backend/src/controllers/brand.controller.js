
import { Brand } from "../models/brand.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBrand = asyncHandler(async (req, res) => {
    const { name, brandImage } = req.body;

    if (!(name || brandImage)){
        return res.status(400).json(new ApiError(400, "", "All Field are Required"));
    }

    let brand = await Brand.findOne({name});
    // check  if the brand already exists in the database or not
    if (brand) {
        return res.status(409).json(new ApiError(409,'', "This brand already exists"));
    }

    try {
        const brandImagePath = req.file?.path;  
        
        // upload on coudinary
        const imageData = await uploadOnCloudinary(brandImagePath);
        
        const newBrand = await Brand.create({
            name,
            brandImage: imageData.url,
        });

        return res.status(201).json(new ApiResponse(201, {newBrand}, "Brand created successfully"));

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json(new ApiError(500, '','Internal Server Error'));
    }
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
    const brand = await Brand.findById( brandId );
    const oldBrandImage = brand?.brandImage;
    
    if (!brand) {
        res.status(404).json(new ApiError(404,"","Brand not found"))
    }
     const public_id = oldBrandImage.split("/").pop().split(".")[0]; 
     
     // remove from cloudinary
     await deleteFromCloudinary(public_id);

    // If there is a new image, we will upload it to Cloudinary and save its URL in the database
    let updatedBrandImage = "";
    if ("brandImage" in req.files){
         const result = await uploadOnCloudinary(req.file.brandImage);
        if (result.error) {
            return res.status(500).json(new ApiError(500,"","Something went wrong while registering the user"))
        } else {
              updatedBrandImage = result.url;  
         }  
    }else{
          updatedBrandImage = oldBrandImage;
    }
   

    // const updatedBrandImagePath = req.file?.path;

    // if (updatedBrandImagePath) {
    //     const newImagePath = await uploadOnCloudinary(updatedBrandImagePath);

    //     if (!newImagePath) {
    //         return res.status(500).json(new ApiError(500,"Something went wrong while registering the user","Something went wrong while registering the user"))
    //     }
    // }

    
    try {
        const brandDoc = await Brand.findByIdAndUpdate(
            brandId,
            {
                $set: {
                    name,
                    brandImage: updatedBrandImage
                }
            },
            { new: true }
        )

    // Delete the old image from Cloudinary if the brand image has changed
    if (oldBrandImage && brandDoc.brandImage !== oldBrandImage) {
        await deleteFromCloudinary(public_id);
    }

    return res.status(201).json(new ApiResponse(201, userDoc, "Brand updated successfully"));
} catch (error) {
    return res.status(500).json(new ApiError(500, 'Internal Server Error', "Internal Server Error"));
    }
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { brandId } = req.params;
    
    // // Check if the category exists
    // const existingBrand = await Brand.findById({_id: brandId});
    // if (!existingBrand) {
    //     return res.status(404).json(new ApiError(404, "",'Brand not found'));
    // }

    try {
        // Delete the category
        const deletedBrand = await Brand.findByIdAndDelete({ _id: brandId });
        
        if (!deletedBrand) {
            return res.status(404).json(new ApiError(404, "",'Brand not found'));
        }

        // Respond with success message
        res.status(200).json(new ApiResponse(200, {}, `${deletedBrand.name} Brand Deleted Successfully`));
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

