const AdoptionEnquiry = require("../models/AdoptionEnquiry");

// Get all adoption enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await AdoptionEnquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
};

// Create new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new AdoptionEnquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: "Enquiry created successfully", enquiry });
  } catch (error) {
    res.status(400).json({ message: "Error creating enquiry", error });
  }
};

// Get enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await AdoptionEnquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiry", error });
  }
};

// Update enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await AdoptionEnquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json({ message: "Enquiry updated successfully", enquiry });
  } catch (error) {
    res.status(500).json({ message: "Error updating enquiry", error });
  }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await AdoptionEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error });
  }
};
