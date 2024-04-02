
import { Cart } from '../models/cart.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";

const createCart = asyncHandler(async (req, res) => {
    
});

const addToCart = asyncHandler(async (req, res) => {
    try {
        const { customerId, productId, quantity, price } = req.body; 

        // Find the cart associated with the customer ID
        let cart = await Cart.findOne({ customerId });

        // If the cart doesn't exist, create a new one
        if (!cart) {
            cart = await Cart.create({ customerId });
        }

        // Add the item to the cart
        cart.items.push({ productId, quantity, price });
        await cart.save();

        res.status(201).json(cart); // Send response with the updated cart
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Send error response
    }
});

const getCarts = asyncHandler(async (req, res) => {
    
})

const updateCart = asyncHandler(async (req, res) => {
    
});


const deleteCart = asyncHandler(async (req, res) => {

});


export {
    createCart,
    addToCart,
    deleteCart,
    getCarts,
    updateCart
};

