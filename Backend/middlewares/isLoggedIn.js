const User = require("../models/Users/User");
const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      const error = new Error(err?.message);
      next(error);
    } else {
      const userId = decoded.user?.id;
      const user = await User.findById(userId).select(
        "username email role _id"
      );
      req.userAuth = user;
      next();
    }
  });
};

module.exports = isLoggedIn;
