const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
  likePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postRouter = express.Router();

//?Create Post Route
postRouter.post("/", isLoggedIn, isAccountVerified, createPost);

//?Fetch All Posts Route
postRouter.get("/", getAllPosts);

//?Fetch Single Post Route
postRouter.get("/:id", getSinglePost);

//?Delete Post Route
postRouter.delete("/:id", isLoggedIn, deletePost);

//?Update Post Route
postRouter.put("/:id", isLoggedIn, updatePost);

//?like a  Post Route
postRouter.put("/like/:postId", isLoggedIn, likePost);

module.exports = postRouter;
