const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("bluebird").promisifyAll(jwt);
require("dotenv").config();

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
    if (!existedUser) {
      return res.status(400).json({ message: "User not exited" });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
