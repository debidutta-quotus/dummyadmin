import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../store/features/auth/authSlice';
import { loadTokenFromCookies } from '../store/features/auth/authUtils';

interface AuthContextProps {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = loadTokenFromCookies();

    if (token) {
      dispatch(setToken(token));
      setIsAuthenticated(true);
    } else {
      dispatch(clearToken());
      setIsAuthenticated(false);
    }

    setIsAuthChecked(true);
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isAuthChecked, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
