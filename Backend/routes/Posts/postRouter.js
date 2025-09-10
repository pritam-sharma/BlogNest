const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
  likePost,
  disLikePost,
  clapPost,
  schedulePost,
} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postRouter = express.Router();

//?Create Post Route
// postRouter.post("/", isLoggedIn, isAccountVerified, createPost);
postRouter.post("/", isLoggedIn, createPost);

//?Fetch All Posts Route
postRouter.get("/", isLoggedIn, getAllPosts);

//?Fetch Single Post Route
postRouter.get("/:id", getSinglePost);

//?Delete Post Route
postRouter.delete("/:id", isLoggedIn, deletePost);

//?Update Post Route
postRouter.put("/:id", isLoggedIn, updatePost);

//?like a  Post Route
postRouter.put("/like/:postId", isLoggedIn, likePost);

//?dislike a  Post Route
postRouter.put("/disLike/:postId", isLoggedIn, disLikePost);

//?claps a  Post Route
postRouter.put("/claps/:postId", isLoggedIn, clapPost);

//?schedule a  Post Route
postRouter.put("/schedule/:postId", isLoggedIn, schedulePost);
module.exports = postRouter;
