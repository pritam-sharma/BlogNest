const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const User = require("../../models/Users/User");
const Category = require("../../models/Categories/Categories");

//@desc Create a new post
//@route POST /api/v1/posts
//@access private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Get the payload
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
    image: req?.file?.path,
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
  console.log("file uploaded", req.file);
  res.json({ imageUrl: req.file.path });
});

//@desc Fech all posts
//@route GET /api/v1/posts
//@access private
exports.getAllPosts = asyncHandler(async (req, res) => {
  //Get the current user id
  const currentUserId = req?.userAuth?._id;
  const currentTime = new Date();
  //Get all those users who have blocked the current user
  const usersBlockingCurrentUser = await User.find({
    blockedUsers: currentUserId,
  });
  //Extract the id of the usrs who have blocked the current user
  const blokingUsersIds = usersBlockingCurrentUser.map((user) => user._id);
  const query = {
    _id: { $nin: blokingUsersIds }, // Exclude blocked users
    $or: [
      { scheduledPublished: { $lte: currentTime } }, // If scheduled time is less than or equal to current time
      { scheduledPublished: null }, // Or if not scheduled at all
    ],
  };
  //Fetch those posts whose authors are not in the blokingUsersIds array
  const allPsts = await Post.find(query).populate({
    path: "author",
    model: "User",
    select: "username email role",
  });
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
  const post = await Post.findById(postId)
    .populate("author")
    .populate("category");

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

//@desc Fetch only four post
//@route GET /api/v1/posts
//@access Public
exports.getPublicPosts = asyncHandler(async (req, res) => {
  // Find latest 4 posts
  const post = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");

  res.status(201).json({
    status: "success",
    message: "Public Posts fetched successfully",
    post,
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
//@desc Like a Post
//@route PUT /api/v1/posts/like/:postId
//@access private
exports.likePost = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const postId = req.params.postId;
  //Get the id of the logged in user
  const loggedInUserId = req?.userAuth?._id;

  //Find the post to be liked
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
    return;
  }
  //add the user to the likes array of the post
  await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: loggedInUserId } },
    { new: true }
  );

  //remove the post from the dislikes array of the user
  post.dislikes = post.dislikes.filter(
    (userId) => userId.toString() !== loggedInUserId.toString()
  );
  //resave the post
  await post.save();
  res.json({
    status: "success",
    message: "Post liked successfully",
    updatedPost: post,
  });
});
//@desc dislikeLike a Post
//@route PUT /api/v1/posts/dislike/:postId
//@access private
exports.disLikePost = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const postId = req.params.postId;
  //Get the id of the logged in user
  const loggedInUserId = req?.userAuth?._id;

  //Find the post to be liked
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
    return;
  }
  //add the user to the likes array of the post
  await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { dislikes: loggedInUserId } },
    { new: true }
  );

  //remove the post from the dislikes array of the user
  post.likes = post.likes.filter(
    (userId) => userId.toString() !== loggedInUserId.toString()
  );
  //resave the post
  await post.save();
  res.json({
    status: "success",
    message: "Post disLiked successfully",
    updatedPost: post,
  });
});
//@desc clap a Post
//@route PUT /api/v1/posts/claps/:postId
//@access private
exports.clapPost = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const postId = req.params.postId;
  //Find the post to be liked
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
    return;
  }
  //implement clap
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { claps: 1 } },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Post clapped successfully",
    updatedPost,
  });
});
//@desc schedule a Post
//@route PUT /api/v1/posts/schedule/:postId
//@access private
exports.schedulePost = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const { postId } = req.params;
  const { scheduledPublished } = req.body;
  //check if postId and scheduledPublish are present
  if (!postId || !scheduledPublished) {
    let error = new Error("PostId and scheduledDate are required");
    next(error);
    return;
  }
  //find the post from DB
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    next(error);
    return;
  }
  //check if the current user is the author of the post
  if (post.author.toString() !== req?.userAuth?._id.toString()) {
    let error = new Error("You are not authorized to schedule this post");
    next(error);
    return;
  }
  const scheduleDate = new Date(scheduledPublished);
  if (scheduleDate <= new Date()) {
    let error = new Error("Scheduled date must be in the future");
    next(error);
    return;
  }
  post.scheduledPublished = scheduleDate;
  await post.save();
  res.json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});
