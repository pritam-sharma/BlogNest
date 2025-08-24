const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const postRouter = express.Router();

//?Create Post Route
postRouter.post("/", isLoggedIn, createPost);

//?Fetch All Posts Route
postRouter.get("/", getAllPosts);

//?Fetch Single Post Route
postRouter.get("/:id", getSinglePost);


module.exports = postRouter;
