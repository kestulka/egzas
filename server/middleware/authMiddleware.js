const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) return res.status(401).send("Access Denied");

  const token = bearerHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const checkAdminRole = async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    console.log("Checking admin role of user:", req.user.id);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    if (user.role !== "admin") {
      console.log("User is not admin");
      return res.status(403).send("Access Denied. Admin role required.");
    }

    console.log("User is an admin");
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { verifyToken, checkAdminRole };
