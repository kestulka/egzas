const Comment = require("../models/commentModel");
const Ad = require("../models/adModel");
const User = require("../models/userModel");

class CommentService {
  async createComment(adId, userId, text) {
    if (!adId || !userId || !text) {
      throw new Error("Please add all info");
    }

    const comment = await Comment.create({
      ad_id: adId,
      user_id: userId,
      text: text,
    });

    const ad = await Ad.findById(adId);
    if (!ad) {
      throw new Error("Ad not found");
    }

    await Ad.findByIdAndUpdate(adId, {
      $push: { comment_ids: comment._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { comment_ids: comment._id },
    });

    return comment;
  }

  async getCommentsByAdId(adId) {
    const comments = await Comment.find({ ad_id: adId }).populate(
      "user_id",
      "name"
    );
    if (!comments) {
      throw new Error("No comments for this ad found");
    }
    return comments;
  }

  async updateComment(commentId, updates) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (updates.text) {
      comment.text = updates.text;
    }

    const result = await comment.save();
    return result;
  }

  async deleteComment(commentId, userId) {
    const result = await Comment.deleteOne({ _id: commentId });
    if (result.deletedCount === 0) {
      throw new Error("Comment not found");
    }

    await Ad.findByIdAndUpdate(adId, {
      $pull: { comment_ids: commentId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { comment_ids: commentId },
    });

    return result;
  }
}

module.exports = new CommentService();
