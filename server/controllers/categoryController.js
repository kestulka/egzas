const asyncHandler = require("express-async-handler");
const categoryService = require("../services/categoryService");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const category = await categoryService.createCategory(name);
    res
      .status(200)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Category creation failed: " + error.message });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Categories retrieval failed: " + error.message });
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryService.getCategoryById(id);
    res
      .status(200)
      .json({ message: "Category retrieved successfully", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Category retrieval failed: " + error.message });
  }
});

const deleteCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await categoryService.deleteCategoryById(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to delete category: " + error.message });
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
};
