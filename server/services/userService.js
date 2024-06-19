const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

class UserService {
  async registerUser(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("Email already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  // to do logout
  async logoutUser(userId) {
    return { message: "Logged out sucessfully" };
  }

  async getUser(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getUsers() {
    const users = await User.find({});
    return users.map((user) => ({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }
}

module.exports = new UserService();
