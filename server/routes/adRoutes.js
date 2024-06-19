const express = require("express");
const router = express.Router();

const {
  createAd,
  getAllAds,
  getAdById,
  getAdsByUserId,
  getUsersFavoriteAds,
  updateAd,
  deleteAd,
  blockAd,
} = require("../controllers/adController");

const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");

//! @ http://localhost:5000/api/ads

router.post("/", verifyToken, createAd); //! reikia tokeno
router.get("/", getAllAds);
router.get("/:id", verifyToken, getAdById); //! reikia tokeno
router.put("/:id", verifyToken, updateAd); //! reikia tokeno
router.delete("/:id", verifyToken, deleteAd); //! reikia tokeno
router.patch("/block/:id", verifyToken, checkAdminRole, blockAd); //! reikia tokeno
router.get("/user/:id", verifyToken, getAdsByUserId); //! reikia tokeno
router.get("/favorites/user/:id", verifyToken, getUsersFavoriteAds); //! reikia tokeno

module.exports = router;
