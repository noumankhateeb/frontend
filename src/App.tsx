// App.tsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  // If user is not authenticated, redirect to login page for protected routes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    // Redirect to login page if the user is not authenticated and tries to access a protected route
    if (!storedToken && !isAuthenticated && !location.pathname.includes('/auth')) {
      navigate('/auth/login');
    }
  }, [location, isAuthenticated, navigate]);

  // Redirect user to the dashboard if they are authenticated
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (isAuthenticated || storedToken) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, token, navigate]);

  return (
    <Routes>
      {/* Redirect to /auth/login if the user is not authenticated */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/login" replace />} />

      {/* Public routes (Login and Signup) */}
      {!isAuthenticated ? (
        <>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </>
      ) : (
        <Route path="/auth/*" element={<Navigate to="/dashboard" replace />} />
      )}

      {/* Protected route (Dashboard) */}
      {isAuthenticated ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/auth/login" replace />} />
      )}
    </Routes>
  );
};

export default App;
