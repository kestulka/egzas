const asyncHandler = require("express-async-handler");
const commentService = require("../services/commentService");

const createComment = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const { text } = req.body;
  const userId = req.user.id;
  try {
    const comment = await commentService.createComment(adId, userId, text);
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Comment creation failed: " + error.message });
  }
});

const getCommentsByAdId = asyncHandler(async (req, res) => {
  const adId = req.params.id;

  try {
    const comments = await commentService.getCommentsByAdId(adId);
    res
      .status(200)
      .json({ message: "Comments retrieved successfully", comments });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Comments retrieval failed: " + error.message });
  }
});

const updateComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const commentId = req.params.id;

  try {
    const comment = await commentService.updateComment(commentId, text);
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(400).json({ error: "Comment update failed: " + error.message });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await commentService.deleteComment(commentId, userId);
    res.status(200).json({ message: "Comment deleted successfully", result });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Comment deletion failed: " + error.message });
  }
});

module.exports = {
  createComment,
  getCommentsByAdId,
  updateComment,
  deleteComment,
};
