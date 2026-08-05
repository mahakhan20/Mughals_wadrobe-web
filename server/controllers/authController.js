const bcrypt = require("bcryptjs");
const User = require("../models/User");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are all required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

module.exports = { signupUser };