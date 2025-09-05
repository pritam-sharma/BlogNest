const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  viewOtherProfile,
  followingUser,
  unfollowUser,
  forgotPassword,
  resetPassword,
  accountVerificationEmail,
  verifyAccount,
} = require("../../controllers/Users/usersController");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const usersRouter = express.Router();

//!register and login routes
usersRouter.post("/register", register);
usersRouter.post("/login", login);

//!profile view route
usersRouter.get("/profile", isLoggedIn, getProfile);

//!Block user Route
usersRouter.put("/block/:userIdToBlock", isLoggedIn, blockUser);

//!Unblock user Route
usersRouter.put("/unblock/:userIdToUnblock", isLoggedIn, unblockUser);

//!Follow a user Route
usersRouter.put("/following/:userIdToFollow", isLoggedIn, followingUser);

//!UnFollow a user Route
usersRouter.put("/unfollowing/:userIdToUnfollow", isLoggedIn, unfollowUser);

//!Forgot password Route
usersRouter.put("/forgot-password", forgotPassword);

//!Reset password Route
usersRouter.put("/reset-password/:resetToken", resetPassword);

//!send account verification email route
usersRouter.put(
  "/account-verification-email",
  isLoggedIn,
  accountVerificationEmail
);

//!Account verification email Route
usersRouter.put("/verify-account/:verifyToken", isLoggedIn, verifyAccount);

//!View another profile Route
usersRouter.get(
  "/view-other-profile/:userProfileId",
  isLoggedIn,
  viewOtherProfile
);
module.exports = usersRouter;
