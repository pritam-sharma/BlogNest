const express = require("express");
const { createPost } = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const postRouter = express.Router();

//?Create Post Route
postRouter.post("/", isLoggedIn, createPost);
module.exports = postRouter;
