// Import mongoose
const mongoose = require("mongoose");

// Create schema for Contact Form data
const contactSchema = new mongoose.Schema({
  // User full name
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  // User email address
  email: {
    type: String,
    required: true,
  },

  // User mobile number
  mobileNumber: {
    type: String,
    required: true,
  },

  // User city
  city: {
    type: String,
    required: true,
    trim: true,
  },

  // Date when contact form was submitted
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Contact model
module.exports = mongoose.model("Contact", contactSchema);
