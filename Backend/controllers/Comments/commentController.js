const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const Comment = require("../../models/Comments/Comments");

//@desc Create a New comment
//@route POST /api/v1/comments/:postId
//@access private
exports.createComment = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const postId = req.params.postId;
  const comment = await Comment.create({
    message,
    author: req?.userAuth?._id,
    postId,
  });
  //Associate comment with post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});

//@desc Update a comment
//@route PUT /api/v1/comments/:commentId
//@access private
exports.updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const message = req.body.message;
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { message },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    status: "success",
    message: "Comment updated successfully",
    updatedComment,
  });
});

//@desc Delete a comment
//@route DELETE /api/v1/comments/:commentId
//@access private
exports.deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId);
  res.json({
    status: "success",
    message: "Comment deleted successfully",
  });
});
