const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gkfweb25-create.github.io",
      "https://your-frontend-domain.com",
      "https://chatbot2025gkf.onrender.com"
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",

    credentials: true,
  })
);

// Fix preflight (OPTIONS) error
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const appointmentRoutes = require("./routes/appointmentRoutes");
const medRepRoutes = require("./routes/medRepRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const authRoutes = require("./routes/authRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

// Use routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medrep", medRepRoutes);
app.use("/api/adoption", adoptionRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GKF Backend API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

module.exports = app;
