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
      purchasePrice: {
        type: Number,
        default: 0
      },
       totalPrice: {
        type: Number,
        default: function() {
          return this.quantity * this.purchasePrice;
        }
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

export const Cart = mongoose.model('Cart', CartSchema);
