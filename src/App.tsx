// App.tsx (with default login route)
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Signup from './components/Signup';

const App: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!localStorage.getItem('token') && !location.pathname.includes("/auth")) {
      navigate('/auth/login')
    }
  }, [location, navigate])


  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (token || storedToken) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (

    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  );
};

export default App;