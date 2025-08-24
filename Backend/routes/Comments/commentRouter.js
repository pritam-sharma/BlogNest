const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../../controllers/Comments/commentController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const commentRouter = express.Router();

//?Create Comment Router
commentRouter.post("/:postId", isLoggedIn, createComment);

//?Update Comment Router
commentRouter.put("/:commentId", isLoggedIn, updateComment);

//?Delete Comment Router
commentRouter.delete("/:commentId", isLoggedIn, deleteComment);

module.exports = commentRouter;
