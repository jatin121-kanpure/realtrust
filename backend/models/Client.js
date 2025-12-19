// Import mongoose
const mongoose = require("mongoose");

// Create schema for Client
const clientSchema = new mongoose.Schema({
  // Client name
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Client designation (CEO, Manager, etc.)
  designation: {
    type: String,
    required: true,
  },

  // Short description or feedback from client
  description: {
    type: String,
    required: true,
  },

  // Client image (filename or URL)
  image: {
    type: String,
    required: true,
  },

  // Date when client was added
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Client model
module.exports = mongoose.model("Client", clientSchema);
