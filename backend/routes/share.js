const express  = require("express");
const crypto   = require("crypto");
const Resource = require("../models/Resource");
const protect  = require("../middleware/authMiddleware");

const router = express.Router();

const makeShareId = () => crypto.randomBytes(8).toString("hex");

// POST /share/resource/:id — toggle share on a single resource
router.post("/resource/:id", protect, async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id, user: req.userId });
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    if (resource.isPublic) {
      // Revoke — use $unset to fully remove shareId from document
      resource.isPublic = false;
      await Resource.updateOne(
        { _id: resource._id },
        { $set: { isPublic: false }, $unset: { shareId: "" } }
      );
      const updated = await Resource.findById(resource._id);
      return res.json(updated);
    } else {
      // Enable sharing
      resource.isPublic = true;
      resource.shareId  = makeShareId();
      await resource.save();
      return res.json(resource);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle share", error: err.message });
  }
});

// POST /share/collection — toggle share for entire category
router.post("/collection", protect, async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ message: "Category required" });

    const resources = await Resource.find({ user: req.userId, category });
    if (!resources.length) return res.status(404).json({ message: "No resources in this category" });

    // Check if ALL are already public — if so, revoke all
    const allPublic = resources.every((r) => r.isPublic);

    if (allPublic) {
      // Revoke entire collection
      await Resource.updateMany(
        { user: req.userId, category },
        { $set: { isPublic: false }, $unset: { shareId: "" } }
      );
      return res.json({ isPublic: false, message: "Collection is now private" });
    } else {
      // Share entire collection
      for (const r of resources) {
        if (!r.isPublic) {
          await Resource.updateOne(
            { _id: r._id },
            { $set: { isPublic: true, shareId: makeShareId() } }
          );
        }
      }
      const collectionToken = Buffer.from(`${req.userId}:${category}`).toString("base64");
      return res.json({ isPublic: true, collectionToken, count: resources.length });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle collection share", error: err.message });
  }
});

// GET /share/resource/:shareId — public
router.get("/resource/:shareId", async (req, res) => {
  try {
    const resource = await Resource.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!resource) return res.status(404).json({ message: "Resource not found or no longer shared" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shared resource" });
  }
});

// GET /share/collection/:token — public
router.get("/collection/:token", async (req, res) => {
  try {
    const decoded  = Buffer.from(req.params.token, "base64").toString("utf8");
    const [userId, category] = decoded.split(":");

    const resources = await Resource.find({ user: userId, category, isPublic: true });
    if (!resources.length) return res.status(404).json({ message: "Collection not found or no longer shared" });

    res.json({ category, resources });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch collection" });
  }
});

module.exports = router;