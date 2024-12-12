const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  foodName: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number,
    required: true
  },
  quantity: { 
    type: Number,
    required: true 
  },
  image: {
    type: String,
    required: true
  },
});

const cartSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  items: [CartItemSchema],
  totalToPay: { 
    type: Number, 
    required: true 
  },
  orderPlaced: {
    type: Boolean,
    default: false // Default value is false, set to true when order is placed
  },
  createdAt: { 
    type: Date,
    default: Date.now 
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
