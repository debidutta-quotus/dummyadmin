import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

interface DecodedToken extends JwtPayload {}

const ProtectedRoutes: React.FC = () => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) return <Outlet />;
    } catch (error) {}
    Cookies.remove('token', { path: '' });
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
