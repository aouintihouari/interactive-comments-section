import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ parentId: null })
      .populate("user", "username image")
      .populate("replyingToUser", "username");
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentId: comment._id })
          .populate("user", "username image")
          .populate("replyingToUser", "username");
        return { ...comment.toObject(), replies };
      })
    );
    res.status(200).json({
      status: "success",
      results: commentsWithReplies.length,
      data: { comments: commentsWithReplies },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, user } = req.body;
    let newComment = await Comment.create({ content, user });
    newComment = await newComment.populate("user", "username image"); // populate juste username et image
    res.status(201).json({ success: true, data: { comment: newComment } });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(400).json({ status: "fail", message: "Bad Request" });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { parentId } = req.params;
    const { content, user, replyingToUser } = req.body;
    if (!mongoose.Types.ObjectId.isValid(parentId))
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid parent comment ID" });
    const parentComment = await Comment.findById(parentId);
    if (!parentComment)
      return res
        .status(404)
        .json({ status: "fail", message: "Parent comment not found" });
    const newReply = await Comment.create({
      content,
      user,
      parentId: parentId,
      replyingToUser: replyingToUser || parentComment.user,
    });
    res.status(201).json({
      status: "success",
      data: { reply: newReply },
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID invalid" });
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true, runValidators: true }
    ).populate("user", "username image");
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({
      status: "success",
      data: { comment: updatedComment },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "ID invalid" });
    const deletedComment = await Comment.findByIdAndDelete({ _id: id });
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });
    await Comment.deleteMany({ parentId: id });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const voteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    if (!["upvote", "downvote"].includes(type))
      return res.status(400).json({ message: "Invalid vote type" });
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.vote === type)
      return res.status(400).json({ message: "You already voted this way." });
    if (comment.vote === "upvote") comment.score -= 1;
    else if (comment.vote === "downvote") comment.score += 1;
    if (type === "upvote") comment.score += 1;
    else if (type === "downvote") comment.score -= 1;
    comment.vote = type;
    await comment.save();
    res.status(200).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ message: "Server error" });
  }
};
