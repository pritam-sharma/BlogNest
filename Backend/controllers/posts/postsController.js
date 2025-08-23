const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const User = require("../../models/Users/User");
const Category = require("../../models/Categories/Categories");

//@desc Create a new post
//@route POST /api/v1/posts
//@access private
exports.createPost = asyncHandler(async (req, res, next) => {
  //Get the payload
  const { title, content, categoryId } = req.body;
  //Check if the post is present
  const isPostFound = await Post.findOne({ title });
  if (isPostFound) {
    let error = new Error("Post already existing");
    next(error);
    return;
  }

  //Create post object
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });
  //Update user by adding post in it
  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    { new: true }
  );
  //Update category by adding post in it
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      $push: { posts: post._id },
    },
    { new: true }
  );
  //Response to client
  res.status(201).json({
    status: "success",
    message: "Post created successfully",
    post,
    user,
    category,
  });
});

