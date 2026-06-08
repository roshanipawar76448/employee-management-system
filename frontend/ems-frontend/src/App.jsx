import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeModeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AddEmployee from './pages/AddEmployee';
import Placeholder from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <ThemeModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/employees" element={
              <ProtectedRoute><Employees /></ProtectedRoute>
            } />
            <Route path="/employees/add" element={
              <ProtectedRoute><AddEmployee /></ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute><Placeholder /></ProtectedRoute>
            } />
            <Route path="/leave" element={
              <ProtectedRoute><Placeholder /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Placeholder /></ProtectedRoute>
            } />
            <Route path="*" element={<Placeholder />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </ThemeModeProvider>
    </AuthProvider>
  );
}