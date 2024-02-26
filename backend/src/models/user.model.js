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
        phone: {
            type: String
        },
        username: {
            type: String,
            required: true,
            lowercase:true,
            trim: true,
        },
         email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (value) => {
                    // Validate email format
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+)\.)+[a-zA-Z]{2,})$/;
                    return re.test(String(value).toLowerCase());
                },
                message: 'Invalid email format'
            }
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 15
        },
        address: {
            type: String
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            }
        ],
        carts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cart'
            }
        ],
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
