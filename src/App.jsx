import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import TaskView from './components/tasks/TaskView';
import GoalView from './components/goals/GoalView';
import Analytics from './components/analytics/Analytics';
import Layout from './components/common/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Profile from './components/profile/Profile';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/tasks" element={
            <PrivateRoute>
              <Layout>
                <TaskView />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/goals" element={
            <PrivateRoute>
              <Layout>
                <GoalView />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/analytics" element={
            <PrivateRoute>
              <Layout>
                <Analytics />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
