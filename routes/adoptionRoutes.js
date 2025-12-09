const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");

// Routes
router.get("/", adoptionController.getAllEnquiries);
router.post("/", adoptionController.createEnquiry);
router.get("/:id", adoptionController.getEnquiryById);
router.put("/:id", adoptionController.updateEnquiry);
router.delete("/:id", adoptionController.deleteEnquiry);

module.exports = router;
