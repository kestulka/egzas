const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryController");

const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");

//! @ http:localhost:5000/api/categories

router.post("/", verifyToken, checkAdminRole, createCategory); //! reikia tokeno
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", verifyToken, checkAdminRole, deleteCategoryById); //! reikia tokeno

module.exports = router;
