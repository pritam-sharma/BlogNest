const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
//@desc Register new user
//@route POST /api/v1/users/register
//@access public
exports.register = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ status: "Failed", message: error?.message });
  }
};

//@desc Login new user
//@route POST /api/v1/users/login
//@access public
exports.login = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({ status: "Failed", message: error?.message });
  }
};
//@desc Profile view
//@route GET /api/v1/users/profile/:id
//@access private
exports.getProfile = async (req, res) => {
  try {
    res.json({
      status: "success",
      message: "Profile fetched successfully",
      user: "dummy user data",
    });
  } catch (error) {
    res.json({ status: "Failed", message: error?.message });
  }
};
