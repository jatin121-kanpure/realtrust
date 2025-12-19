// Import required modules
const express = require("express");
const Project = require("../models/Project");
const { upload, processImage } = require("../middleware/upload");

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
});

// Add new project
router.post("/", upload.single("image"), processImage, async (req, res) => {
  try {
    const { name, description } = req.body;

    // Basic validation
    if (!name || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Project image is required" });
    }

    const newProject = new Project({
      name,
      description,
      image: `/uploads/${req.file.filename}`,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
