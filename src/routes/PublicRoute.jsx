import useAuthStore from '@/stores/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const { accessToken } = useAuthStore();

  return accessToken ? <Navigate to="/home" replace /> : children;
}
