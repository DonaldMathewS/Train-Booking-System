const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hiddenKey } = require("../secret/key");
const validator = require("validator");

exports.createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const exists = await user.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      userName,
      email,
      password: hashedPassword,
    });

    const userH = await newUser.save();
    const token = createToken(userH._id);

    res.status(201).json({
      data: userH,
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      return res.status(400).json({
        success: false,
        message: "userName and password are required",
      });
    const data = await user.findOne({ userName });

    if (!data)
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "invalid password  " });
    }
    const token = createToken(data._id);
    res.json({
      data: data,
      success: true,
      message: "token",
      data: data,
      token,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, hiddenKey, { expiresIn: "7d" });
};

exports.allUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(201).json({
      success: true,
      message: "got all user details",
      data: users,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "failed to get user info ,try again!",
    });
  }
};
