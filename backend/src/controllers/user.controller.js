import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user exits, (username, email)
    // check for images, check for image
    // upload them to cloudinory, avatar
    // create user Object, create entry in db
    // remove password and refresh token field form response
    // check for user creation
    // return res 

    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some((flield) => flield?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const exitedUser = User.findOne({ email });
    
    // const exitedUser = User.findOne({
    //     $or: [{ email }, {otherOne}]
    // });

    if (exitedUser) {
        throw new ApiError(409, "User with email already exits")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser,"User registered successfully")
    )

})

export { registerUser };

