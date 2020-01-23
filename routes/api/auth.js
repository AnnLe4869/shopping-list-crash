const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

require("bluebird").promisifyAll(jwt);
require("dotenv").config();

const User = require("../../models/User");

// @route POST api/auth
// @desc AUTHENTICATE user
// @access public
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for all fields is filled
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all the required field" });
    }
    // Check for existed user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Validate password
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = await jwt.signAsync(
      {
        id: user._id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 10 * 60
      }
    );
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: token
    });
  } catch (err) {
    console.error(err);
  }
});

// @route GET api/auth/user
// @desc AUTHENTICATE user
// @access private
router.get("/user", authMiddleware, async (req, res) => {
  try {
    // Check for existed user
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
