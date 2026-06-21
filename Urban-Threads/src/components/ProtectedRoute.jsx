import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authContext = useAuth();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}