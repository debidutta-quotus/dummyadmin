// ProtectedRoutes.ts
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

interface DecodedToken extends JwtPayload {
  // Add any custom claims from your token here if needed
}

const ProtectedRoutes: React.FC = () => {
  // const token = localStorage.getItem('token');
  const token = Cookies.get('token');

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
        return <Outlet />;
      } else {
        Cookies.remove('token', { path: '' });
        return <Navigate to="/login" />;
      }
    } catch (e) {
      Cookies.remove('token', { path: '' });
      return <Navigate to="/login" />; // Corrected line
    }
  } else {
    return <Navigate to="/login" />; // Corrected line
  }
};

export default ProtectedRoutes;
