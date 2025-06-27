import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/users/check-auth");
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return authenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
