import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String,
            required: true,
            lowercase:true,
            trim: true,
        },
        password: {
            type: String,
            required: [true,"Password is required"],
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        role: {
            type: String,
            default: "CUSTOMER",
            enum: ["ADMIN", "CUSTOMER",]
        },
        refreshToken: {
            type: String
        }
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id, 
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}


export const User = mongoose.model('User', userSchema);
