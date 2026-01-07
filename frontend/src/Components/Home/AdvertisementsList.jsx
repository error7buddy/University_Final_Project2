import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdvertisementList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ads")
      .then((res) => setAds(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!ads.length)
    return <p className="text-center mt-6">No ads found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <div
          key={ad._id}
          className="border rounded-lg shadow bg-white overflow-hidden"
        >
          {ad.images?.length > 0 && (
            <img
              src={`http://localhost:5000/uploads/${ad.images[0]}`}
              className="h-48 w-full object-cover"
              alt=""
            />
          )}

          <div className="p-4">
            <h2 className="font-bold text-lg">{ad.title}</h2>
            <p className="text-sm text-gray-600">
              {ad.address?.area}, {ad.address?.district}
            </p>
            <p className="mt-2">{ad.bhk}</p>
            <p className="text-sm text-gray-500 mt-2">
              {ad.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
