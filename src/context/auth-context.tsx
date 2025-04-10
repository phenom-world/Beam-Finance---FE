import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

interface Auth {
  accessToken: string;
  tokenExpiry: number;
}

interface AuthContextType {
  auth: Auth | null;
  login: (authData: Auth) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (new Date(parsedUser.tokenExpiry).getTime() > Date.now()) {
        setAuth(parsedUser);
      } else {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (authData: Auth) => {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    mutate(() => true, undefined, { revalidate: false });
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    auth,
    login,
    logout,
    isAuthenticated: !!auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
