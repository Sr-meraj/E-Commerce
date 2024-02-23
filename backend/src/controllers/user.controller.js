import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

/**
 * The function generates access and refresh tokens for a user and saves the refresh token to the user
 * document.
 * @param userId - The `userId` parameter is the unique identifier of a user for whom we want to
 * generate access and refresh tokens. It is used to find the user in the database and generate tokens
 * for that specific user.
 * @returns The function `generateAccessAndRefreshToken` returns an object containing the generated
 * access token and refresh token.
 */
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}


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

    const { fullname, email, password, phone } = req.body;

    if ([fullname, email, password].some((flield) => flield?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const exitedUser = await User.findOne({ email });
    
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
        password,
        phone
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // req.body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // res.cookies

    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "email is required")
    }
    
    // const user = await User.findOne({
    //     $or: [{ email }, { username }]
    // });
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exits");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User loging successfully"
            )
        )
     
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            $set: { refreshToken: undefined },
        },
        {
            new: true
        }
    )
    
    const options = {
        httpOnly: true,
        secure: true
    }   
    
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
           new ApiResponse(200, {}, "User logged out")
        )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access token refreshed"
            )
        );
})

export { registerUser, loginUser, logout, refreshAccessToken };

