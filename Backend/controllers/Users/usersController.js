const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
//@desc Register new user
//@route POST /api/v1/users/register
//@access public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Existing");
  }
  const newUser = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  res.json({
    status: "success",
    message: "User registered successfully",
    _id: newUser?.id,
    username: newUser?.username,
    email: newUser?.email,
    role: newUser?.role,
  });
});
//@desc Login new user
//@route POST /api/v1/users/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  user.lastlogin = new Date();
  await user.save();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

//@desc Profile view
//@route GET /api/v1/users/profile/:id
//@access private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userAuth.id);
  res.json({
    status: "success",
    message: "Profile fetched successfully",
    user,
  });
});

//@desc Block user
//@route PUT /api/v1/users/block/:userIdToBlock
//@access private
exports.blockUser = asyncHandler(async (req, res, next) => {
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    let error = new Error("User to block is not found!");
    next(error);
    return;
  }
  const userBlocking = req?.userAuth._id;

  //!check if it is self blocking
  if (userBlocking.toString() === userIdToBlock.toString()) {
    let error = new Error("You can't block yourself!");
    next(error);
    return;
  }

  //!Get current user object from DB
  const currentUser = await User.findById(userBlocking);

  //!Check whether the userIdToBlock is already blocked
  if (currentUser.blockedUsers.includes(userIdToBlock)) {
    let error = new Error("This user has already been blocked!");
    next(error);
    return;
  }

  //!push the user to be blocked in the blockedUsers array
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    status: "success",
    message: "User blocked successfully",
  });
});

//@desc Unblock user
//@route POST /api/v1/users/unblock/:userIdToBlock
//@access private
exports.unblockUser = asyncHandler(async (req, res, next) => {
  const userIdToUnblock = req.params.userIdToUnblock;

  // ✅ Check if the user to unblock exists
  const userToUnblock = await User.findById(userIdToUnblock);
  if (!userToUnblock) {
    let error = new Error("User to unblock is not found!");
    next(error);
    return;
  }

  const userUnblocking = req?.userAuth._id;

  // ✅ Prevent self-unblocking error handling.
  if (userUnblocking.toString() === userIdToUnblock.toString()) {
    let error = new Error("You can't unblock yourself!");
    next(error);
    return;
  }

  // ✅ Get the current user
  let currentUser = await User.findById(userUnblocking);

  // ✅ Check if the user is even blocked
  if (!currentUser.blockedUsers.includes(userIdToUnblock)) {
    const error = new Error("This user is not in your blocked list!");
    next(error);
    return;
  }

  // ✅ Remove the user from the blockedUsers array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnblock.toString()
  );

  await currentUser.save();

  res.json({
    status: "success",
    message: "User unblocked successfully",
  });
});
