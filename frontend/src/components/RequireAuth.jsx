import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUserAuth } from '../hooks/useUserAuth';
import { UserContext } from '../context/userContext';

export default function RequireAuth() {
  const initialized = useUserAuth();
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!initialized) return null;                  
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
