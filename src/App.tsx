import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { RootState } from './redux/rootReducer';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const storedToken = localStorage.getItem('token');
  const isAuthValid = isAuthenticated || storedToken;

  return (
    <Routes>
      <Route path="/" element={isAuthValid ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={isAuthValid ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/auth/signup" element={isAuthValid ? <Navigate to="/dashboard" replace /> : <Signup />} />
      <Route path="/dashboard" element={isAuthValid ? <Dashboard /> : <Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default App;
