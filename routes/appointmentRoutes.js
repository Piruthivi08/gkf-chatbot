const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Routes
router.get("/", appointmentController.getAllAppointments);
router.post("/", appointmentController.createAppointment);
router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
