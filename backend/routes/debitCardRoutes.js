const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const DebitCard = require("../model/debitCardModel");

// Add new card
router.post("/", authMiddleware, async (req, res) => {
  const { cardNumber, nameOnCard, expiration, cvc } = req.body;
  const userId = req.user;
  try {
    const newCard = new DebitCard({
      userId,
      cardNumber,
      nameOnCard,
      expiration,
      cvc,
    });

    await newCard.save();
    res.status(201).json({ success: true, message: "Card added successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add card.", error: err.message });
  }
});

// Get specefic  card
router.get("/:cardId", authMiddleware, async (req, res) => {
  const userId = req.user;
  const { cardId } = req.params;
  try {
    const card = await DebitCard.findOne({ _id: cardId, userId }).select("-__v -createdAt"); 
    res.status(200).json({ card });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cards.", error: err.message });
  }
});
// Get all cards
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user;
  try {
    const cards = await DebitCard.find({ userId: userId }).select("-__v -createdAt");
    res.status(200).json({  cards });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cards.", error: err.message });
  }
});

// Update card
router.put("/updatecard/:cardId", authMiddleware, async (req, res) => {
  const userId = req.user;
  const { cardId } = req.params;
  const { cardNumber, nameOnCard, expiration, cvc } = req.body;

  try {
    const card = await DebitCard.findOneAndUpdate(
      { _id: cardId, userId: userId },
      { cardNumber, nameOnCard, expiration, cvc },
      { new: true }
    );

    if (!card) return res.status(404).json({ success: false, message: "Card not found or unauthorized access." });

    res.status(200).json({ success: true, message: "Card updated successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update card.", error: err.message });
  }
});

// Delete card
router.delete("/deletecard/:cardId", authMiddleware, async (req, res) => {
  const userId = req.user;
  const { cardId } = req.params;

  try {
    const card = await DebitCard.findOneAndDelete({ _id: cardId, userId: userId });

    if (!card) return res.status(404).json({ success: false, message: "Card not found or unauthorized access." });

    res.status(200).json({ success: true, message: "Card deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete card.", error: err.message });
  }
});

module.exports = router;
