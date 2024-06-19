const express = require("express");
const router = express.Router();

const {
  createComment,
  getCommentsByAdId,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");

//! @ http://localhost:5000/api/comments

router.post("/ad/:id", verifyToken, createComment); //! reikia tokeno
router.get("/ad/:id", getCommentsByAdId);
router.put("/:id", verifyToken, updateComment); //! reikia tokeno
router.delete("/:id", verifyToken, deleteComment); //! reikia tokeno

module.exports = router;
