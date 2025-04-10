import { PropsWithChildren, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router';

import { useAuth } from '../../hooks/useAuth';

const AuthRoute = ({ children }: PropsWithChildren): ReactNode => {
  const { auth, logout } = useAuth();
  const now = Date.now();

  if (!auth) {
    return <Navigate to='/login' replace />;
  }

  if (now >= new Date(auth.tokenExpiry).getTime() || !auth.accessToken) {
    toast.error('Session expired, Login again');
    logout();
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default AuthRoute;
