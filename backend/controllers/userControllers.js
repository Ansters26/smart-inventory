const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "user registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token).json({ message: "Login Succesfull" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};


module.exports = { register, login, logout };
