const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/Users/usersController");

const usersRouter = express.Router();

//register and login routes
usersRouter.post("/api/v1/users/register", register);
usersRouter.post("/api/v1/users/login", login);

//profile view route
usersRouter.get("/api/v1/users/profile/:id", getProfile);

module.exports = usersRouter;
