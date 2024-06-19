const Ad = require("../models/adModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const Favorite = require("../models/favoriteModel");
const { populate } = require("../models/adModel");

class AdService {
  async createAd(image, price, description, categoryId, userId) {
    if (!image || !price || !description || !categoryId || !userId) {
      throw new Error("Please add all info");
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("This category does not exist in the database");
    }

    const ad = await Ad.create({
      image: image,
      price: price,
      description: description,
      category_id: categoryId,
      user_id: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { ad_ids: ad._id },
    });
    return ad;
  }

  async getAllAds() {
    const ads = await Ad.find().populate("category_id", "name");

    return ads;
  }

  async getUsersFavoriteAds(userId) {
    const favorites = await Favorite.find({ user_id: userId });
    const favoriteIds = favorites.map((favorite) => favorite._id);
    // mongoDB $in operator efficiently finds multiple values
    const ads = await Ad.find({ favorite_ids: { $in: favoriteIds } }).populate(
      "category_id",
      "name"
    );

    return ads;
  }

  async getAdById(adId) {
    const ad = await Ad.findById(adId).populate("category_id", "name");

    if (!ad) {
      throw new Error("Ad not found");
    }
    return ad;
  }

  async getAdsByUserId(userId) {
    const ads = await Ad.find({ user_id: userId }).populate(
      "category_id",
      "name"
    );
    return ads;
  }

  async updateAd(adId, updates) {
    const ad = await Ad.findById(adId);
    if (!ad) {
      throw new Error("Ad not found");
    }

    if (updates.image) {
      ad.image = updates.image;
    }

    if (updates.price) {
      ad.price = updates.price;
    }

    if (updates.description) {
      ad.description = updates.description;
    }

    if (updates.category_id) {
      ad.category_id = updates.category_id;
    }

    const result = await ad.save();
    return result;
  }

  async deleteAd(adId, userId) {
    const result = await Ad.deleteOne({ _id: adId });
    if (result.deletedCount === 0) {
      throw new Error("Ad not found");
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { ad_ids: adId },
    });

    return result;
  }
}

module.exports = new AdService();
