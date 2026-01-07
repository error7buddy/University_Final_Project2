import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/config";

import App from "./App";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Advertise_home from "./Components/Advertise/Advertise_home";
import AuthForm from "./Components/Auth/AuthForm";
import AdminPage from "./Components/Admin/AdminPage";
import Shifting from "./Components/Shifting/Shifting";
import BookShifting from "./Components/Shifting/BookShifting";

// ✅ Protected Route (for regular users)
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return user ? children : <Navigate to="/auth" replace />;
};

// ✅ Admin Protected Route
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin"); // set during login
  return isAdmin ? children : <Navigate to="/auth" replace />;
};

// ✅ Root Redirect (dynamic)
const RootRedirect = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
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

// ✅ Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <RootRedirect /> }, // 🔹 Dynamic redirect
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "advertise",
        element: (
          <ProtectedRoute>
            <Advertise_home />
          </ProtectedRoute>
        ),
      },
      { path: "shifting", element: <Shifting /> },
      { path: "book-shifting/:id", element: <BookShifting /> },
      { path: "auth", element: <AuthForm /> },
      { path: "admin", element: <AdminProtectedRoute><AdminPage /></AdminProtectedRoute> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
