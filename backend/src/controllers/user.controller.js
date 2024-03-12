import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { deleteFromCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';


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

    const { fullname, email, password, phone, username } = req.body;

    if ([fullname,username, email, password].some((flield) => flield?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // const exitedUser = await User.findOne({ email });
    
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username: username.toLowerCase() }
        ]
    });

    if (existingUser) {
        res.status(409).json(
             new ApiError(409, null, "User with username or email already exits",'User with this Email or Username already exists')
            )
    }

    let avatar = null;

    if (req.files && req.files.avatar) {
        const avatarLocalPath = req.files.avatar[0].path;
        avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(400, "Error uploading avatar");
        }
    }

    const user = await User.create({
        fullname,
        avatar: avatar ? avatar.url : null,
        email,
        username: username.toLowerCase(),
        password,
    })
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, {uid:createdUser._id}, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // req.body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // res.cookies

    const { username, email, password } = req.body;
    if (!(email || username)) {
        //dev
        // throw new ApiError(400, "email or username field is required")

        // production
        res.status(400).json(new ApiError(400, "", "email or username field is required"));
    }
    
    const user = await User.findOne({
        $or: [{ email }, { username }]
    });
    // const user = await User.findOne({ email })

    if (!user) {
        //dev
        // throw new ApiError(404, "user does not exist");
        //production
        res.status(404).json(new ApiError(404, "", "User does not exist."));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        //dev
        // throw new ApiError(401, "Invalid user credentials")
        
        // production
        res.status(401).json(new ApiError(401, "", "Invalid user credentials"));
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
        { _id: req.user._id },
        {
            $unset: { refreshToken: 1 },
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

});

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
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    
    res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )

});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
});

const changeAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email, phone } = req.body;
    if (!fullname && !email && !phone) {
        throw new ApiError(400, "All fields are required")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname, email, phone
            }
        },
        { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const user = req.user;
    const oldAvatar = user?.avatar;
    const public_id = oldAvatar.split("/").pop().split(".")[0]

    // Check image field in request body
    const avatarLocalFile = req.file?.path;
    if (!avatarLocalFile) {
        throw new ApiError(400, "No file uploaded");
    }

    const avatar = await uploadOnCloudinary(avatarLocalFile)
    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading a avatar");
    }

    const userDoc = await User.findOneAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true, upsert: true }
    ).select("-password");

    // Delete the old image from Cloudinary if the avatar has changed
    if (oldAvatar && userDoc.avatar !== oldAvatar) {
        await deleteFromCloudinary(public_id);
    }

    return res.status(201).json(new ApiResponse(201, userDoc, "Avatar updated successfully"));

});

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken");
        res.status(200).json(new ApiResponse(201, users, "Users fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
})


// give user to Admin access


export {
    registerUser,
    loginUser,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    changeAccountDetails,
    updateUserAvatar,
    getAllUser


};

