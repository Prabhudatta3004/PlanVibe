import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import TaskView from './components/tasks/TaskView';
import GoalView from './components/goals/GoalView';
import Analytics from './components/analytics/Analytics';
import Layout from './components/common/Layout';

function App() {
  // Set isAuthenticated to true by default for testing
  const [isAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard by default */}
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/tasks" element={
          <Layout>
            <TaskView />
          </Layout>
        } />
        <Route path="/goals" element={
          <Layout>
            <GoalView />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />

        {/* Keep auth routes for future use */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
