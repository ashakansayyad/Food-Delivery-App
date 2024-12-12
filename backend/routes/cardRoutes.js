const express = require("express");
const router = express.Router();
const Card = require("../model/cardModel");

router.post("/upload", async (req, res) => {
  try {
    const {
      imageOne,
      imageTwo,
      imageThree,
      restaurant,
      restaurantName,
      discount,
      foodName,
      price,
      titleOne,
      titleTwo,
      titleThree,
      titleFour,
      cardType,
    } = req.body;
    if (!["type1", "type2", "type3", "type4", "type5","burgers","fries","coldDrinks","reviews"].includes(cardType)) {
      return res.status(400).json({ message: "Invalid card type" });
    }
    const card = new Card({
      imageOne,
      imageTwo,
      imageThree,
      restaurant,
      restaurantName,
      discount,
      foodName,
      price,
      titleOne,
      titleTwo,
      titleThree,
      titleFour,
      cardType,
    });

    await card.save();
    return res
      .status(200)
      .json({ message: "Card created successfully!", card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cardType", async (req, res) => {
  try {
    const cardType = req.params.cardType;
    const filter = cardType ? { cardType } : {};
    const cards = await Card.find(filter);
    if (!cards.length) {
      return res.status(404).json({ message: "No cards found" });
    }
    return res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
