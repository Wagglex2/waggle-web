import useAuthStore from '@/stores/useAuthStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
