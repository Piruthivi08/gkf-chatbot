const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");

// Routes
router.get("/", internshipController.getAllApplications);
router.post("/", internshipController.createApplication);
router.get("/:id", internshipController.getApplicationById);
router.put("/:id", internshipController.updateApplication);
router.delete("/:id", internshipController.deleteApplication);

module.exports = router;
