import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    bhk: String,
    address: {
      houseNo: String,
      area: String,
      district: String,
      phone: String,
    },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", adSchema);
