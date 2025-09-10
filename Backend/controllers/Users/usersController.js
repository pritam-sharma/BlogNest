const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const sendEmail = require("../../utils/sendEmails");
const crypto = require("crypto");
const sendVerificationEmail = require("../../utils/sendVarificationEmail");
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
  const user = await User.findById(req.userAuth.id)
    .populate({
      path: "posts",
      model: "Post",
    })
    .populate({
      path: "following",
      model: "User",
    })
    .populate({ path: "followers", model: "User" })
    .populate({ path: "blockedUsers", model: "User" })
    .populate({
      path: "profileViewers",
      model: "User",
    });
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

//@desc View another user profile
//@route GET /api/v1/users/view-other-profile/:userProfileId
//@access private
exports.viewOtherProfile = asyncHandler(async (req, res, next) => {
  const userProfileId = req.params.userProfileId;
  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    let error = new Error("User whose profile is to be viewed not present!");
    next(error);
    return;
  }
  const currentUserId = req?.userAuth._id;
  //check if we have already viewd the profile of userProfile
  if (userProfile.profileViewers.includes(currentUserId)) {
    let error = new Error("You have already viewed the profile");
    next(error);
    return;
  }
  //puth the currentUserId into array of userProfile
  userProfile.profileViewers.push(currentUserId);
  //update the DB
  await userProfile.save();
  res.json({
    status: "success",
    message: "Profile viewed successfully",
  });
});

//@desc Follow User
//@route PUT /api/v1/users/following/:userIdToFollow
//@access private
exports.followingUser = asyncHandler(async (req, res, next) => {
  //find the current user id
  const currentUserId = req?.userAuth?._id;
  //find the user to be followed
  const userIdToFollow = req.params.userIdToFollow;
  const userProfile = await User.findById(userIdToFollow);
  if (!userProfile) {
    let error = new Error("User to be follwed not present");
    next(error);
    return;
  }
  //Avoid current user following himself
  if (currentUserId.toString() === userIdToFollow.toString()) {
    let error = new Error("You cannot follow yourself!");
    next(error);
    return;
  }
  //Push the id of userToFollow inside following array of current user
  await User.findByIdAndUpdate(
    currentUserId,
    {
      $addToSet: { following: userIdToFollow },
    },
    { new: true }
  );
  //Push the current user id into the followers array of userToFollow
  await User.findByIdAndUpdate(
    userIdToFollow,
    {
      $addToSet: { followers: currentUserId },
    },
    { new: true }
  );
  //send the response
  res.json({
    status: "success",
    message: "You have followed the user",
  });
});

//@desc unFollow User
//@route PUT /api/v1/users/unfollowing/:userIdToUnFollow
//@access private
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req?.userAuth?._id;
  const userIdToUnfollow = req.params.userIdToUnfollow;

  const userProfile = await User.findById(userIdToUnfollow);
  if (!userProfile) {
    return next(new Error("User to unfollow not found!"));
  }

  if (currentUserId.toString() === userIdToUnfollow.toString()) {
    return next(new Error("You cannot unfollow yourself!"));
  }

  const currentUser = await User.findById(currentUserId);

  if (!currentUser.following.includes(userIdToUnfollow)) {
    return res.status(400).json({
      status: "failed",
      message: "You are not following this user",
    });
  }

  // ✅ Remove the IDs from both users
  await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { following: userIdToUnfollow } },
    { new: true }
  );

  await User.findByIdAndUpdate(
    userIdToUnfollow,
    { $pull: { followers: currentUserId } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "You have unfollowed this user",
  });
});

//@desc Forgot passwort
//@route POST /api/v1/users/forgot-password
//@access public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //!fetch the email
  const { email } = req.body;

  //!find email in the db
  const userFound = await User.findOne({ email });
  if (!userFound) {
    let error = new Error("This email id is not registered with us");
    next(error);
    return;
  }
  //!Get the reset token
  const resetToken = await userFound.generateResetToken();
  await userFound.save();
  sendEmail(email, resetToken);
  //send the response
  res.json({
    status: "success",
    message: "Password reset token sent to your email successfully",
  });
});
//@desc Reset Passwort
//@route POST /api/v1/users/reset-password/:resetToken
//@access public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get the token from params
  const { resetToken } = req.params;
  const { password } = req.body;

  //Convert resetToken into hashed token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //verify the token with DB
  const userFound = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //If user is not found
  if (!userFound) {
    let error = new Error("Password reset token is invalid or expired");
    next(error);
    return;
  }
  //update the new password
  const salt = await bcrypt.genSalt(10);
  userFound.password = await bcrypt.hash(password, salt);
  userFound.passwordResetToken = undefined;
  userFound.passwordResetExpires = undefined;

  //Resave the user
  await userFound.save();
  res.json({
    status: "success",
    message: "Password has been changed successfully",
  });
});
//@desc send account verification mail
//@route POST /api/v1/users/account-verification-email
//@access private
exports.accountVerificationEmail = asyncHandler(async (req, res, next) => {
  //find the current user's email
  const currentUser = await User.findById(req?.userAuth?._id);
  if (!currentUser) {
    let error = new Error("User not found");
    next(error);
    return;
  }
  //Get the token from current user object
  const verifyToken = await currentUser.generateAccountVerificationToken();

  //resavel the user
  await currentUser.save();

  //send the verification email
  sendVerificationEmail(currentUser.email, verifyToken);

  res.json({
    status: "success",
    message: `Account verication email has been sent to your registered email id ${currentUser.email}`,
  });
});

//@desc account token verification
//@route POST /api/v1/users/verify-account/:verifyToken
//@access private
exports.verifyAccount = asyncHandler(async (req, res, next) => {
  //Get the token from params
  const { verifyToken } = req.params;
  //Convert verifyToken into hashed token
  let hashedToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  //verify the token with DB
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationExpires: { $gt: Date.now() },
  });
  //If user is not found
  if (!userFound) {
    let error = new Error("Account verification token is invalid or expired");
    next(error);
    return;
  }
  //Update the isVerified field to true
  userFound.isVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationExpires = undefined;
  //Resave the user
  await userFound.save();
  res.json({
    status: "success",
    message: "your account has been verified successfully",
  });
});
