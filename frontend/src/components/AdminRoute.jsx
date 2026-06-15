import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!usuario.administrador) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;