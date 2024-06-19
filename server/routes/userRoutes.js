const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  blockUser,
} = require("../controllers/userController");

const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");

//! @ http://localhost:5000/api/users

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser); //! reikia tokeno
router.get("/:id", verifyToken, getUser); //! reikia tokeno
router.get("/", verifyToken, getUsers); //! reikia tokeno
router.delete("/:id", verifyToken, checkAdminRole, blockUser); //! reikia tokeno

module.exports = router;
