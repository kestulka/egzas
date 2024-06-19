const userService = require("../services/userService");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// user register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.registerUser(name, email, password);
    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(400).json({ error: "Registration failed: " + error.message });
  }
});

// user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ error: "Login failed: " + error.message });
  }
});

// user logout
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await userService.logoutUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Logout failed: " + error.message });
  }
});

// get user
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "User not found: " + error.message });
  }
});

// get users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Failed to get users: " + error.message });
  }
});

// Block user
const blockUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`Deleting user with ID: ${userId}`);
    // Check if user exists in database
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found: ${userId}`);
      return res.status(404).send({ error: "User not found" });
    }
    console.log(`Found user: ${user}`);
    // Delete user from database
    await User.deleteOne({ _id: userId });
    console.log(`User deleted successfully: ${userId}`);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    res.status(400).send({ error: "User deletion failed" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  blockUser,
};
