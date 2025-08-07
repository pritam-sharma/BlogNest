const express = require("express");
const { register } = require("../../controllers/Users/usersController");

const usersRouter = express.Router();
usersRouter.post("/api/v1/users/register", register);

module.exports = usersRouter;
