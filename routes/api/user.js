const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");

// @route POST api/users
// @desc REGISTER new user
// @access public
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check for all fields is filled
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all the required field" });
    }
    // Check for existed user
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exited" });
    }
    // If not existed yet
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashPassword });
    console.log(newUser);
    return res.status(200).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
