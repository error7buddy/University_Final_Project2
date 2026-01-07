import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";

export default function Advertise_home() {
  const [formData, setFormData] = useState({
    title: "",
    houseNo: "",
    area: "",
    district: "",
    bhk: "",
    description: "",
    phone: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImages(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setMessage("Please login first");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    Array.from(images).forEach((img) => data.append("images", img));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ads",
        data // ✅ NO HEADERS
      );

      if (res.data.success) {
        setMessage("✅ Advertisement posted successfully!");
        setFormData({
          title: "",
          houseNo: "",
          area: "",
          district: "",
          bhk: "",
          description: "",
          phone: "",
        });
        setImages([]);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to post advertisement");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Post Advertisement
      </h1>

      {message && (
        <p className="text-center mb-4 text-red-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2" required />
        <input name="houseNo" placeholder="House No" onChange={handleChange} className="w-full border p-2" required />
        <input name="area" placeholder="Area" onChange={handleChange} className="w-full border p-2" required />
        <input name="district" placeholder="District" onChange={handleChange} className="w-full border p-2" required />
        <input name="bhk" placeholder="BHK" onChange={handleChange} className="w-full border p-2" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2" required />

        <input type="file" multiple onChange={handleImageChange} />

        <button className="w-full bg-black text-white p-2 rounded">
          Post Ad
        </button>
      </form>
    </div>
  );
}
