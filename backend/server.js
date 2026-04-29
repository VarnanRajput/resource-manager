const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const resourceRoutes = require("./routes/resources");
const shareRoutes = require("./routes/share");  

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://resource-manager-2.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/resources", resourceRoutes);
app.use("/share", shareRoutes);   
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});             

// Health check
app.get("/", (req, res) => res.json({ message: "Resource Manager API running" }));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/resourcemanager";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
