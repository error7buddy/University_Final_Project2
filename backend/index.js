import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adRoutes from "./routes/advertisement.js";
import shiftingRoutes from "./routes/shifting.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// serve images
app.use("/uploads", express.static("uploads"));

// mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// test
app.get("/", (req, res) => res.send("Backend running"));

// ROUTES
app.use("/api/ads", adRoutes);
app.use("/api/shifting-orders", shiftingRoutes); // ✅ REQUIRED

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
