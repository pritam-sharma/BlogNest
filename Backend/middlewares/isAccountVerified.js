const User = require("../models/Users/User");
const isAccountVerified = async (req, res) => {
  try {
    const currentUser = await User.findById(req?.userAuth?._id);
    if (currentUser.isVerified) {
      next();
    } else {
      res.status(401).json({
        status: "fail",
        message:
          "Your account is not verified. Please verify your account to access this resource.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error. Please try again later.",
    });
  }
};
module.exports = isAccountVerified;
