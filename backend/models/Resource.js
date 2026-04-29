const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:       { type: String, required: true, trim: true },
    link:        { type: String, required: true },
    description: { type: String, default: "" },
    category:    { type: String, default: "General" },
    isFavorite:  { type: Boolean, default: false },

    // Sharing fields
    isPublic:   { type: Boolean, default: false },
    shareId:    { type: String, default: null, unique: true, sparse: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);