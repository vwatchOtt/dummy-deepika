import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token =
    useSelector((state) => state.auth?.token) || localStorage.getItem("token");

  const location = useLocation();

  if (!token) {
    // no login token → redirect to login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
