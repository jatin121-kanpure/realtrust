// Import mongoose to create schema and model
const mongoose = require("mongoose");

// Create schema for Project
const projectSchema = new mongoose.Schema({
  // Project title or name
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Short description about the project
  description: {
    type: String,
    required: true,
  },

  // Image filename or image URL
  image: {
    type: String,
    required: true,
  },

  // Date when project is created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Project model
module.exports = mongoose.model("Project", projectSchema);
