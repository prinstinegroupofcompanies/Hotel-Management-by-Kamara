import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = localStorage.getItem("hotelAuth") === "true";

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
