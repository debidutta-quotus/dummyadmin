import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRoutes: React.FC = () => {
  const token = Cookies.get('token');
  const location = useLocation();
  if (token) {
    return <Navigate to={location.state?.from || '/admin/dashboard'} replace />;
  }
  return <Outlet />;
};

export default AuthRoutes;
