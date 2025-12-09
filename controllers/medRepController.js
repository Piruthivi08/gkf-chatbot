const MedRepVisit = require("../models/MedRepVisit");

// Get all medical rep visits
exports.getAllVisits = async (req, res) => {
  try {
    const visits = await MedRepVisit.find();
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visits", error });
  }
};

// Create new visit
exports.createVisit = async (req, res) => {
  try {
    const visit = new MedRepVisit(req.body);
    await visit.save();
    res.status(201).json({ message: "Visit created successfully", visit });
  } catch (error) {
    res.status(400).json({ message: "Error creating visit", error });
  }
};

// Get visit by ID
exports.getVisitById = async (req, res) => {
  try {
    const visit = await MedRepVisit.findById(req.params.id);
    if (!visit) return res.status(404).json({ message: "Visit not found" });
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visit", error });
  }
};

// Update visit
exports.updateVisit = async (req, res) => {
  try {
    const visit = await MedRepVisit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!visit) return res.status(404).json({ message: "Visit not found" });
    res.status(200).json({ message: "Visit updated successfully", visit });
  } catch (error) {
    res.status(500).json({ message: "Error updating visit", error });
  }
};

// Delete visit
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await MedRepVisit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ message: "Visit not found" });
    res.status(200).json({ message: "Visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting visit", error });
  }
};
