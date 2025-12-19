// Import mongoose
const mongoose = require("mongoose");

// Create schema for Newsletter subscriptions
const newsletterSchema = new mongoose.Schema({
  // Subscriber email address
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  // Date when user subscribed
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export Newsletter model
module.exports = mongoose.model("Newsletter", newsletterSchema);
