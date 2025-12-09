const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile);

module.exports = router;
