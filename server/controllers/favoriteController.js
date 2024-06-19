const asyncHandler = require("express-async-handler");
const favoriteService = require("../services/favoriteService");

const createFavorite = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const userId = req.user.id;

  try {
    const favorite = await favoriteService.createFavorite(userId, adId);
    res
      .status(201)
      .json({ message: "Favorite created successfully", favorite });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Favorite creation failed: " + error.message });
  }
});

const deleteFavoriteByUserIdAndAdId = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const userId = req.user.id;

  try {
    const favorite = await favoriteService.deleteFavoriteByUserIdAndAdId(
      userId,
      adId
    );
    res
      .status(200)
      .json({ message: "Favorite deleted successfully", favorite });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Favorite deletion failed: " + error.message });
  }
});

const getFavoritesByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await favoriteService.getFavoritesByUserId(userId);
    res
      .status(200)
      .json({ message: "User favorites retrieved successfully", favorites });
  } catch (error) {
    res
      .status(400)
      .json({ error: "User favorites retrieval failed: " + error.message });
  }
});

const getFavoritesByAdId = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  try {
    const favorites = await favoriteService.getFavoritesByAdId(adId);
    res
      .status(200)
      .json({ message: "Ad favorites retrieved successfully", favorites });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ad favorites retrieval failed: " + error.message });
  }
});

const checkIfAdIsFavoritedByUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const adId = req.params.id;
  try {
    const isFavorited = await favoriteService.checkIfAdIsFavoritedByUser(
      userId,
      adId
    );
    res.status(200).json({
      message: "Favorite check result retrieved successfully",
      isFavorited,
    });
  } catch (error) {
    res.status(400).json({
      error: "Favorite check result retrieval failed: " + error.message,
    });
  }
});

module.exports = {
  createFavorite,
  deleteFavoriteByUserIdAndAdId,
  getFavoritesByUserId,
  getFavoritesByAdId,
  checkIfAdIsFavoritedByUser,
};
