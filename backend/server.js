// Import required packages
const express = require("express"); // Express framework
const mongoose = require("mongoose"); // MongoDB ODM
const cors = require("cors"); // Handle cross-origin requests
require("dotenv").config(); // Load environment variables

// Create express app
const app = express();

// Middleware Section

// Allow frontend to access backend APIs
app.use(cors());

// Parse JSON data from requests
app.use(express.json());

// Parse form data (URL encoded)
app.use(express.urlencoded({ extended: true }));

// Make uploads folder public so images can be accessed in browser
app.use("/uploads", express.static("uploads"));

// MongoDB Connection

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Stop server if DB fails
  });

// API Routes

// Project related APIs
app.use("/api/projects", require("./routes/projects"));

// Client related APIs
app.use("/api/clients", require("./routes/clients"));

// Contact form APIs
app.use("/api/contacts", require("./routes/contacts"));

// Newsletter subscription APIs
app.use("/api/newsletters", require("./routes/newsletters"));

// Health Check Route

// Simple route to check if server is running
app.get("/health", (req, res) => {
  res.json({ message: "Server is running fine 👍" });
});

// Global Error Handler

// Handles unexpected server errors
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    error: "Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong on the server",
  });
});

// Start Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
