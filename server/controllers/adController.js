const asyncHandler = require("express-async-handler");
const adService = require("../services/adService");

const createAd = asyncHandler(async (req, res) => {
  const { image, price, description, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const ad = await adService.createAd(
      image,
      price,
      description,
      categoryId,
      userId
    );
    res.status(201).json({ message: "Ad created successfully", ad });
  } catch (error) {
    res.status(400).json({ error: "Ad creation failed: " + error.message });
  }
});

const getAllAds = asyncHandler(async (req, res) => {
  try {
    const ads = await adService.getAllAds();
    res.status(200).json({ message: "Ads retrieved successfully", ads });
  } catch (error) {
    res.status(400).json({ error: "Ads retrieval failed: " + error.message });
  }
});

const getAdById = asyncHandler(async (req, res) => {
  try {
    const ad = await adService.getAdById(req.params.id);
    res.status(200).json({ message: "Ad retrieved successfully", ad });
  } catch (error) {
    res.status(400).json({ error: "Ad retrieval failed: " + error.message });
  }
});

const getAdsByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const ads = await adService.getAdsByUserId(userId);
    res.status(200).json({ message: "Ads retrieved successfully", ads });
  } catch (error) {
    res.status(400).json({ error: "Ads retrieval failed: " + error.message });
  }
});

const getUsersFavoriteAds = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const ads = await adService.getUsersFavoriteAds(userId);
    res.status(200).json({ message: "Ads retrieved successfully", ads });
  } catch (error) {
    res.status(400).json({ error: "Ads retrieval failed: " + error.message });
  }
});

const updateAd = asyncHandler(async (req, res) => {
  const updates = req.body;
  const adId = req.params.id;

  try {
    const ad = await adService.updateAd(adId, updates);
    res.status(200).json({ message: "Ad updated successfully", ad });
  } catch (error) {
    res.status(400).json({ error: "Ad update failed: " + error.message });
  }
});

const deleteAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await adService.deleteAd(adId, userId);
    res.status(200).json({ message: "Ad deleted successfully", result });
  } catch (error) {
    res.status(400).json({ error: "Ad deletion failed: " + error.message });
  }
});

const blockAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;

  try {
    const ad = await adService.getAdById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    ad.isBlocked = true;
    await ad.save();
    res.status(200).json({ message: "Ad blocked successfully", ad });
  } catch (error) {
    res.status(400).json({ error: "Ad blocking failed: " + error.message });
  }
});

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  getAdsByUserId,
  getUsersFavoriteAds,
  updateAd,
  deleteAd,
  blockAd,
};
