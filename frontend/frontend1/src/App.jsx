import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import ToastContainer, { useToast } from './components/Toast';
import LandingPage from './pages/LandingPage';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminUsers from './pages/admin/AdminUser';
import AdminIssues from './pages/admin/AdminIssues';
import IssueBook from './pages/admin/IssueBook';
import AdminFines from './pages/admin/AdminFines';
import AdminRequests from './pages/admin/AdminRequests';
import AdminReports from './pages/admin/AdminReports';
import Analytics from './pages/admin/Analytics';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import BookRequests from './pages/student/BookRequests';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ToastContainer toasts={toasts} removeToast={removeToast} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/issues"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminIssues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/issue-book"
              element={
                <ProtectedRoute requiredRole="admin">
                  <IssueBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fines"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminFines />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/requests"
              element={
                <ProtectedRoute requiredRole="user">
                  <BookRequests />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;