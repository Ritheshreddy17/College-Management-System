import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
  allowedRoles,
  children,
}) {
  const role =
    localStorage.getItem("role");

  if (
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;