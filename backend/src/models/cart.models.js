import mongoose, { Schema } from 'mongoose';

const CartItem = new Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
}
)

const CartSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [CartItem]
    },
    { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;