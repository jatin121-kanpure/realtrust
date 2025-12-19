const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET ALL CONTACTS
// This route fetches all contact form submissions from the database
router.get("/", async (req, res) => {
  try {
    // Find all contacts and sort them by newest first
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts); // Send the contacts as JSON
  } catch (error) {
    // If something goes wrong, return a 500 status with the error message
    res.status(500).json({ error: error.message });
  }
});

// SUBMIT CONTACT FORM
// This route receives a new contact form submission
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    // Check if all fields are filled
    if (!fullName || !email || !mobileNumber || !city) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new contact object
    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city,
    });

    // Save the contact to the database
    await contact.save();

    // Send success message back to frontend
    res.status(201).json({
      message: "Contact form submitted successfully",
      contact,
    });
  } catch (error) {
    // If something goes wrong, send back an error message
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
