import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './auth/UserContext';
import DiscussionBoard from './views/DiscussionBoard';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import './App.css';

function ProtectedRoute({ children }) {
  const { currentUser } = React.useContext(UserContext);
  return currentUser ? children : <Navigate to="/signin" />;
}

function PublicRoute({ children }) {
  const { currentUser } = React.useContext(UserContext);
  return !currentUser ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <div className="forum-magic">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/signin" 
              element={
                <PublicRoute>
                  <div className="bounce-gentle">
                    <SignIn />
                  </div>
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <div className="bounce-gentle">
                    <SignUp />
                  </div>
                </PublicRoute>
              } 
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="forum-glow">
                    <DiscussionBoard />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      
      {/* Animated background particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 8}s`
          }}
        />
      ))}
      
      {/* Leaf animations */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`leaf-${i}`}
          className="leaf"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${12 + Math.random() * 12}s`
          }}
        />
      ))}
    </div>
  );
}