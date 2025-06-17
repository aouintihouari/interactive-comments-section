import express from "express";
import {
  getAllComments,
  createComment,
  replyToComment,
  updateComment,
  deleteComment,
  voteComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.route("/").get(getAllComments).post(createComment);
router.route("/:parentId/replies").post(replyToComment);
router.route("/:id").patch(updateComment).delete(deleteComment);
router.patch("/:id/vote", voteComment);

export default router;
