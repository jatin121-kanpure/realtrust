// Import required modules
const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

// Get all newsletter subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({
      subscribedAt: -1,
    });

    res.json(subscribers);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch newsletter subscribers",
    });
  }
});

// Subscribe to newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Convert email to lowercase
    const userEmail = email.toLowerCase();

    // Check if email already exists
    const alreadySubscribed = await Newsletter.findOne({
      email: userEmail,
    });

    if (alreadySubscribed) {
      return res.status(400).json({
        error: "Email is already subscribed",
      });
    }

    const newSubscriber = new Newsletter({
      email: userEmail,
    });

    await newSubscriber.save();

    res.status(201).json({
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to subscribe to newsletter",
    });
  }
});

module.exports = router;
