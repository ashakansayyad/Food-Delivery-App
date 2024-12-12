const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// user registeration
router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const userExist =await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save
    const newUser = await User({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User Register Successfully!" });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(400).json({ message: "User registration failed!" });
  }
});

//add new address
router.patch("/address", authMiddleware, async (req, res) => {
  const { address } = req.body; // Expect address in the request body
  const userId = req.user; // Get the userId from the token (authMiddleware)

  if (!address) {
    return res.status(400).json({ message: "Address field is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new address object
    const newAddress = {
      address,
      isDefault: user.addresses.length === 0, // First address is default
    };

    // Push to user's address array
    user.addresses.push(newAddress);
    await user.save();

    return res.status(200).json({
      message: "Address added successfully",
      addresses: user.addresses, // Optional: Return updated addresses
    });
  } catch (err) {
    console.error("Error adding address:", err);
    return res.status(500).json({ message: "Failed to add address" });
  }
});


//change default address
router.patch("/address/default", authMiddleware, async (req, res) => {
  const {  addressId } = req.body;
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset all addresses to non-default
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });

    // Set the selected address as default
    const defaultAddress = user.addresses.id(addressId);
    if (!defaultAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    defaultAddress.isDefault = true;

    await user.save();
    return res
      .status(200)
      .json({ message: "Default address updated successfully", addresses: user.addresses });
  } catch (err) {
    console.error("Error updating default address:", err);
    return res.status(500).json({ message: "Failed to update default address" });
  }
});


// Get all logged user data
router.get("/address", authMiddleware, async (req, res) => {
  const userId  = req.user;

  try {
    const user = await User.findById(userId).select("-_v -password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email is valid or not
    const isValid = await User.findOne({ email });
    if (!isValid) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    // compare the input password with hashedpassword stored  in the  database
    const isPasswordMatch = await bcrypt.compare(password, isValid.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    // generate JWT
    // creat the payload contain the users id
    const payload = { id: isValid._id };
    //sign the token using secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
});


// Update user profile
router.patch("/updateUserData", authMiddleware, async (req, res) => {
  const userId = req.user; // Authenticated user's ID
  const { name, email, gender, country } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (country) user.country = country;

    await user.save();

    return res.status(200).json({
      message: "User profile updated successfully!",
      user,
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;