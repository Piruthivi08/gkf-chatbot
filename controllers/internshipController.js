const InternshipApplication = require("../models/InternshipApplication");

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await InternshipApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Create new application
exports.createApplication = async (req, res) => {
  try {
    const application = new InternshipApplication(req.body);
    await application.save();
    res
      .status(201)
      .json({ message: "Application created successfully", application });
  } catch (error) {
    res.status(400).json({ message: "Error creating application", error });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error });
  }
};

// Update application
exports.updateApplication = async (req, res) => {
  try {
    const application = await InternshipApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res
      .status(200)
      .json({ message: "Application updated successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await InternshipApplication.findByIdAndDelete(
      req.params.id
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error });
  }
};
