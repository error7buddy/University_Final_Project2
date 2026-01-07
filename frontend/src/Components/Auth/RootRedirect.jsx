// src/Components/Auth/RootRedirect.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const RootRedirect = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin) return <Navigate to="/admin" replace />;
  if (user) return <Navigate to="/home" replace />;
  return <Navigate to="/auth" replace />;
};

export default RootRedirect;
