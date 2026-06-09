import { useAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authContext = useAuth();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}