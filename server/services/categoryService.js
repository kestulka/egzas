const Category = require("../models/categoryModel");

class CategoryService {
  async createCategory(name) {
    if (!name) {
      throw new Error("Category name is required");
    }
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      throw new Error("Category already exists");
    }
    const category = await Category.create({
      name: name,
    });
    return category;
  }

  async getAllCategories() {
    const categories = await Category.find();
    if (!categories) {
      throw new Error("No categories found");
    }
    return categories;
  }

  async getCategoryById(id) {
    const category = await Category.findById({ _id: id });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async deleteCategoryById(id) {
    const result = await Category.deleteOne({ _id: id });
    return result;
  }
}

module.exports = new CategoryService();
