//@desc Register new user
//@route POST /api/v1/users/register
//@access public
const User = require("../../models/Users/User");
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User Already Existing");
    }
    const newUser = new User({ username, email, password });
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
    res.json({status:"Failed",message:error?.message})
  }
};
