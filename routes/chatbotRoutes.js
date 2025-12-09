const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// Routes
router.post("/message", chatbotController.sendMessage);
// router.get("/history", chatbotController.getChatHistory);

module.exports = router;
