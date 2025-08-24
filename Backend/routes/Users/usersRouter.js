const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
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

module.exports = usersRouter;
