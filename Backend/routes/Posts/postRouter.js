const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const postRouter = express.Router();

//?Create Post Route
postRouter.post("/", isLoggedIn, createPost);

//?Fetch All Posts Route
postRouter.get("/", getAllPosts);

//?Fetch Single Post Route
postRouter.get("/:id", getSinglePost);

//?Delete Post Route
postRouter.delete("/:id", isLoggedIn, deletePost);

//?Update Post Route
postRouter.put("/:id", isLoggedIn, updatePost);

module.exports = postRouter;
