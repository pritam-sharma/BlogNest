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

//@desc Fech all posts
//@route GET /api/v1/posts
//@access public
exports.getAllPosts = asyncHandler(async (req, res) => {
  const allPsts = await Post.find({});
  res.status(201).json({
    status: "success",
    message: "All Posts fetched successfully",
    allPsts,
  });
});

//@desc Fetch a single post
//@route GET /api/v1/posts/:id
//@access Public
exports.getSinglePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  // Find post by ID
  const post = await Post.findById(postId);

  // If post not found
  if (post) {
    res.json({
      status: "success",
      message: "Post fetched successfully",
      post,
    });
  } else {
    res.json({
      status: "success",
      message: "No post available",
      post,
    });
  }
});

//@desc Update a post
//@route PUT /api/v1/posts/:id
//@access private
exports.updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = req.body;
  const updatedPost = await Post.findByIdAndUpdate(postId, post, {
    new: true,
    runValidators: true,
  });
  res.json({
    status: "success",
    message: "Post updated successfully",
    updatedPost,
  });
});

//@desc Delete a post
//@route DELETE /api/v1/posts/:id
//@access private
exports.deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  await Post.findByIdAndDelete(postId);
  res.json({
    status: "success",
    message: "Post deleted successfully",
  });
});
