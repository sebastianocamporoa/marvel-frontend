import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  return Cookies.get('accessToken') ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
