
import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js";

const updateCart = asyncHandler(async (req, res) => {
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $push: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


const createCart = asyncHandler(async (req, res) => {
    try {
        const customerId = req.user._id; // make sure user is the owner of this cart

        const products = req.body.products;
        if (!customerId || !products) throw new Error('Invalid data');

        // Create a new cart with the customer ID and products
        const cart = await Cart.create({ customerId, products });
        
        // Decrease the quantity of products in stock
        decreaseQuantity(products);
        
        res.status(201).json(new ApiResponse(200, { cartId: cart._id }, 'Cart created successfully.')); // Send response with the updated cart
    } catch (error) {
        console.error('Error adding item(s) to cart:', error);
        res.status(500).json(new ApiError(500,"Internal Server Error",'Internal Server Error')); // Send error response
    }
});


const deleteCart = asyncHandler(async (req, res) => {
    try {
        await Cart.deleteOne({ _id: req.params.cartId });

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $pull: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const decreaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

export {
    createCart,
    deleteCart,
    deleteCartItem,
    updateCart
};

