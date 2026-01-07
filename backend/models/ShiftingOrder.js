import mongoose from "mongoose";

const shiftingOrderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    from_location: String,
    from_floor: String,
    to_location: String,
    to_floor: String,
    shift_type: String,
    date: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("ShiftingOrder", shiftingOrderSchema);
