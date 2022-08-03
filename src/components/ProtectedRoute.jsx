import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import{auth} from '../firebase-config'

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  return loading ? null : user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
