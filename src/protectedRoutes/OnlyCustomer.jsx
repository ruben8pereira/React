import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function OnlyCustomer({ element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!user || (user && user.role !== "customer")) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
