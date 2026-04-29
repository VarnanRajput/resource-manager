const express = require("express");
const Resource = require("../models/Resource");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below require a valid JWT
router.use(protect);

// GET /resources — get all resources for logged-in user
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

// POST /resources — create a new resource
router.post("/", async (req, res) => {
  const { title, link, description, category } = req.body;
  try {
    const resource = await Resource.create({
      user: req.userId,
      title,
      link,
      description,
      category,
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to create resource" });
  }
});

// PUT /resources/:id — update a resource
router.put("/:id", async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // ensure ownership
      req.body,
      { new: true }
    );
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to update resource" });
  }
});

// DELETE /resources/:id — delete a resource
router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete resource" });
  }
});

// PATCH /resources/:id/favorite — toggle favorite
router.patch("/:id/favorite", async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id, user: req.userId });
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    resource.isFavorite = !resource.isFavorite; // toggle
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle favorite" });
  }
});

module.exports = router;
