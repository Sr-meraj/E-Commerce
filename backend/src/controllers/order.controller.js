import { Cart } from "../models/cart.model";
import { Order } from "../models/order.model";

const createOrder = asyncHandler(async (req, res) => {
    try {
        const cart = req.body.cartId;
        const total = req.body.total;
        const user = req.user._id;

        const order = new Order({
            cart,
            user,
            total
        });

        const orderDoc = await order.save();

        const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
            path: 'products.product',
            populate: {
                path: 'brand'
            }
        });

        const newOrder = {
            _id: orderDoc._id,
            created: orderDoc.created,
            user: orderDoc.user,
            total: orderDoc.total,
            products: cartDoc.products
        };

        res.status(200).json({
            success: true,
            message: `Your order has been placed successfully!`,
            order: { _id: orderDoc._id }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});












const increaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};
