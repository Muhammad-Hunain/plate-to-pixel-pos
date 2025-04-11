
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

// This is a simple auth check wrapper
// In a real application, you would check for actual authentication status
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  
  // For demo purposes, we'll assume the user is always authenticated
  // In a real app, check for auth token or user session here
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect to the login page with a return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
