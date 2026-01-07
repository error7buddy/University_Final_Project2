import express from "express";
import ShiftingOrder from "../models/ShiftingOrder.js";

const router = express.Router();

// POST shifting order
router.post("/", async (req, res) => {
  try {
    const order = new ShiftingOrder(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Shifting order booked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all shifting orders (for admin/testing)
router.get("/", async (req, res) => {
  const orders = await ShiftingOrder.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
