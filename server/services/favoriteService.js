const Favorite = require("../models/favoriteModel");
const Ad = require("../models/adModel");
const User = require("../models/userModel");

class FavoriteService {
  async createFavorite(userId, adId) {
    if (!userId || !adId) {
      throw new Error("Missing userId or adId");
    }

    const existingFavorite = await Favorite.findOne({
      user_id: userId,
      ad_id: adId,
    });
    if (existingFavorite) {
      throw new Error("Favorite already exists");
    }

    const favorite = await Favorite.create({
      user_id: userId,
      ad_id: adId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { favorite_ids: favorite._id },
    });
    await Ad.findByIdAndUpdate(adId, {
      $push: { favorite_ids: favorite._id },
    });
    return favorite;
  }

  async deleteFavoriteByUserIdAndAdId(userId, adId) {
    if (!userId || !adId) {
      throw new Error("Missing userId or adId");
    }

    const favorite = await Favorite.findOneAndDelete({
      user_id: userId,
      ad_id: adId,
    });

    if (!favorite) {
      throw new Error("Favorite not found");
    }

    const ad = await Ad.findById(adId);
    if (!ad) {
      throw new Error("Ad not found");
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { favorite_ids: favorite._id },
    });

    await Ad.findByIdAndUpdate(adId, {
      $pull: { favorite_ids: favorite._id },
    });
    return favorite;
  }

  async getFavoritesByUserId(userId) {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const favorites = await Favorite.find({ user_id: userId });

    if (!favorites || favorites.length === 0) {
      throw new Error("No favorites found for this user");
    }
    return favorites;
  }

  async getFavoritesByAdId(adId) {
    if (!adId) {
      throw new Error("Missing adId");
    }

    const favorites = await Favorite.find({ ad_id: adId });
    return favorites;
  }

  async checkIfAdIsFavoritedByUser(userId, adId) {
    if (!userId || !adId) {
      throw new Error("Missing userId or adId");
    }
    const favorite = await Favorite.findOne({ user_id: userId, ad_id: adId });
    if (!favorite) {
      return false;
    }
    return true;
  }
}

module.exports = new FavoriteService();
