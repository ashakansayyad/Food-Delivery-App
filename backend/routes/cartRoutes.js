const express = require("express");
const router = express.Router();
const Cart = require("../model/cartModel");
const authMiddleware = require("../middleware/authMiddleware");

// Add item to cart
router.post("/addCartToCheckout", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body; // Only items sent from the frontend
    const userId = req.user;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ creator: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        creator: userId,
        items,
        totalToPay: 0, // Initialize totalToPay
      });
    } else {
      // Update cart: Merge new items with existing ones
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item._id === newItem._id
        );

        if (existingItem) {
          // If item exists, update quantity
          existingItem.quantity += newItem.quantity;
        } else {
          // If item is new, add to cart
          cart.items.push(newItem);
        }
      });
    }

    // Recalculate totalToPay
    cart.totalToPay = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(201).json({ message: "Cart updated successfully!" });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Error adding to cart", err });
  }
});



//order successfully placed
router.post("/orderSuccess", authMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ creator: userId });

    if (!cart) {
      return res.status(404).json({ message: "No cart found!" });
    }

    // Separate ordered items
    const orderedItems = cart.items.map((item) => ({
      ...item.toObject(),
      orderPlaced: true,
    }));

    // Mark items as ordered and update cart
    cart.items = cart.items.filter((item) => !item.orderPlaced);
    cart.totalToPay = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    // Return ordered items
    res.status(200).json({
      message: "Order placed successfully!",
      orderedItems
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Error placing order", err });
  }
});




// Get cart items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ creator: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out ordered items
    const activeItems = cart.items.filter((item) => !item.orderPlaced);
    const inactiveItems = cart.items.filter((item)=>item.orderPlaced == true);
    res.status(200).json({
      items: activeItems,
      totalToPay: cart.totalToPay,
      placedOrder:inactiveItems,
    });
    console.log(inactiveItems);
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Error fetching cart items", err });
  }
});



module.exports = router;
