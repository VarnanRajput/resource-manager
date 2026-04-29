const express  = require("express");
const crypto   = require("crypto");
const Resource = require("../models/Resource");
const protect  = require("../middleware/authMiddleware");

const router = express.Router();

// Generate a random share ID
const makeShareId = () => crypto.randomBytes(8).toString("hex");

// POST /share/resource/:id — toggle share on a single resource
router.post("/resource/:id", protect, async (req, res) => {
  try {
    const resource = await Resource.findOne({ _id: req.params.id, user: req.userId });
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    if (resource.isPublic) {
      // Revoke sharing
      resource.isPublic = false;
      resource.shareId  = null;
    } else {
      // Enable sharing
      resource.isPublic = true;
      resource.shareId  = makeShareId();
    }

    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle share" });
  }
});

// POST /share/collection — share all resources of a category
router.post("/collection", protect, async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ message: "Category required" });

    // Find all resources in this category for this user
    const resources = await Resource.find({ user: req.userId, category });
    if (!resources.length) return res.status(404).json({ message: "No resources in this category" });

    // Give each one a shareId if not already shared
    const shareIds = [];
    for (const r of resources) {
      if (!r.isPublic) {
        r.isPublic = true;
        r.shareId  = makeShareId();
        await r.save();
      }
      shareIds.push(r.shareId);
    }

    // Return a collection share link token (category + user encoded)
    const collectionToken = Buffer.from(`${req.userId}:${category}`).toString("base64");
    res.json({ collectionToken, count: resources.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to share collection" });
  }
});

// GET /share/resource/:shareId — public, no auth needed
router.get("/resource/:shareId", async (req, res) => {
  try {
    const resource = await Resource.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!resource) return res.status(404).json({ message: "Resource not found or no longer shared" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shared resource" });
  }
});

// GET /share/collection/:token — public, no auth needed
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