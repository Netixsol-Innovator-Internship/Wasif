import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);


    if (role) {
      const allowedRoles = Array.isArray(role) ? role : [role];
      if (!allowedRoles.includes(decoded.role)) {
        return <Navigate to="/" />;
      }
    }

    return children;
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" />;
  }
}
