import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/wallet' replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
