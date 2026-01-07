import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  email: String,
  is_premium: { type: Boolean, default: false },
  ads_left: { type: Number, default: 1 },
});

export default mongoose.model("User", UserSchema);
