import express from "express";
import Advertisement from "../models/Advertisement.js";
import multer from "multer";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST ad
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files.map(f => f.filename);
    const ad = new Advertisement({
      title: req.body.title,
      description: req.body.description,
      bhk: req.body.bhk,
      address: {
        houseNo: req.body.houseNo,
        area: req.body.area,
        district: req.body.district,
        phone: req.body.phone,
      },
      images,
    });
    await ad.save();
    res.json({ success: true, ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all ads
router.get("/", async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE ad permanently
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Advertisement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Ad not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
