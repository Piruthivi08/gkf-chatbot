const express = require("express");
const router = express.Router();
const medRepController = require("../controllers/medRepController");

// Routes
router.get("/", medRepController.getAllVisits);
router.post("/", medRepController.createVisit);
router.get("/:id", medRepController.getVisitById);
router.put("/:id", medRepController.updateVisit);
router.delete("/:id", medRepController.deleteVisit);

module.exports = router;
