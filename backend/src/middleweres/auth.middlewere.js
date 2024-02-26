import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // const token = req?.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const token = req?.cookie?.accessToken || req.header("Authorization")?.split(" ")[1];
        if (!token) {
            //dev
            // throw new ApiError(401, "Unauthorized request!")
            // production
            res.status(401).json(new ApiError(401, '', "Unauthorized request!"));
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
            // dev
            // throw new ApiError(401, "Invalid Access Token")

            // production
            res.status(401).json(new ApiError(401, '', "Invalid Access Token"));
        }
    
        req.user = user;
        next();

    } catch (error) {
        // dev
        // throw new ApiError(500, error?.message || "Invalid Access Token")
        // production
        res.status(500).json(new ApiError(500, '', error?.message || "Invalid Access Token"));
    }
});

export const adminCheck = asyncHandler(async (req, res, next) => {
    try {
        // Assuming your User model has an 'isAdmin' field
        const isAdmin = req.user.role;

        /* This code snippet is checking if the user making the request is an admin. */
        if (isAdmin !== "ADMIN") {

            throw new ApiError(403, "Permission denied. Admin access required.");
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs, handle it and send an appropriate response
        throw new ApiError(500, error?.message || "Error checking admin privileges");
    }
});
