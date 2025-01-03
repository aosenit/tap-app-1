import { Navigate } from "react-router-dom";
import { useAuthQuery } from "@/hooks/useAuthQuery";

const ProtectedRoute = ({ children }: any) => {
  const { data: user, isLoading } = useAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
