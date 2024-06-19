const express = require("express");
const router = express.Router();

const {
  createFavorite,
  deleteFavoriteByUserIdAndAdId,
  getFavoritesByUserId,
  getFavoritesByAdId,
  checkIfAdIsFavoritedByUser,
} = require("../controllers/favoriteController");

const { verifyToken } = require("../middleware/authMiddleware");

//! @ http:localhost:5000/api/favorites

router.post("/ad/:id", verifyToken, createFavorite); //! reikia tokeno
router.delete("/ad/:id", verifyToken, deleteFavoriteByUserIdAndAdId); //! reikia tokeno
router.get("/ad/:id", getFavoritesByAdId);
router.get("/ad/:id/isFavorited", verifyToken, checkIfAdIsFavoritedByUser); //! reikia tokeno
router.get("/", verifyToken, getFavoritesByUserId); //! reikia tokeno

module.exports = router;
