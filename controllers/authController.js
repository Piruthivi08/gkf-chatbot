const AdminUser = require("../models/AdminUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register admin user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new admin user
    const adminUser = new AdminUser({ username, email, password, role });
    await adminUser.save();

    res
      .status(201)
      .json({ message: "Admin user created successfully", adminUser });
  } catch (error) {
  console.error("REGISTER ERROR:", error);
  res.status(500).json({ message: "Error registering admin user", error: error.message });
}

};

// Login admin user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser._id, email: adminUser.email, role: adminUser.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, adminUser });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get admin user profile
exports.getProfile = async (req, res) => {
  try {
    const adminUser = await AdminUser.findById(req.user.id);
    if (!adminUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(adminUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
