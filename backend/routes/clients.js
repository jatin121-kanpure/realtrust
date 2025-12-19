// Import required modules
const express = require("express");
const Client = require("../models/Client");
const { upload, processImage } = require("../middleware/upload");

const router = express.Router();

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// Add new client
router.post("/", upload.single("image"), processImage, async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    // Basic validation
    if (!name || !designation || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Client image is required" });
    }

    const newClient = new Client({
      name,
      designation,
      description,
      image: `/uploads/${req.file.filename}`,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: "Failed to add client" });
  }
});

// Delete client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete client" });
  }
});

module.exports = router;
