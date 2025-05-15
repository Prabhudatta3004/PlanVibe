import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Tasks from './pages/Tasks';
import { TaskProvider } from './context/TaskContext';

function App() {
    return (
        <Router>
            <TaskProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Tasks />} />
                        <Route path="/tasks" element={<Tasks />} />
                        {/* Add other routes as they are implemented */}
                    </Routes>
                </Layout>
            </TaskProvider>
        </Router>
    );
}

export default App; 