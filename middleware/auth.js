const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("bluebird").promisifyAll(jwt);
require("dotenv").config();

const User = require("../models/User");

// @route POST api/auth
// @desc AUTHENTICATE user
// @access public
const authMiddleware = async (req, res, next) => {
  // Retrieve token from header
  // Token can be in x-auth-token or authorization
  let token = req.header("x-auth-token") || req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from token
    token = token.slice(7, token.length);
  }
  // Check for whether token is provided

  try {
    const decoded = await jwt.verifyAsync(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Token is invalid" });
    next(err);
  }
};

module.exports = authMiddleware;
