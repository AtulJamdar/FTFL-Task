import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useAuth();

  // Not authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (requiredRole && user.role !== requiredRole) {
    const redirectPath =
      user.role === 'admin'
        ? '/admin/dashboard'
        : '/student/dashboard';

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;