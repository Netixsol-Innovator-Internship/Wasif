const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const UserExist = await User.findOne({ email });
  if (UserExist) {
    return res.status(409).json({
      message: "Email Already Exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ email, name, password: hashedPassword });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  const user = await User.findOne({ email });
  console.log("User found:", user);

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};

module.exports = { register, login };
