import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuestionGenerator from './pages/QuestionGenerator';
import NotesGenerator from './pages/NotesGenerator';
import AnswerChecker from './pages/AnswerChecker';
import Performance from './pages/Performance';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/question-generator"
                element={
                  <ProtectedRoute>
                    <QuestionGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes-generator"
                element={
                  <ProtectedRoute>
                    <NotesGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/answer-checker"
                element={
                  <ProtectedRoute>
                    <AnswerChecker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/performance"
                element={
                  <ProtectedRoute>
                    <Performance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
