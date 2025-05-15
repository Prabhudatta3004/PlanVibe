import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    PlusIcon,
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8080/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch dashboard');
                const data = await res.json();
                setDashboard(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchDashboard();
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-600 text-white';
            case 'medium':
                return 'bg-yellow-500 text-white';
            case 'low':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-700 text-white';
        }
    };

    if (loading) return <div className="p-8 text-center text-lg text-gray-300">Loading dashboard...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!dashboard) return null;

    const { completedTasks, upcomingTasks, goalsProgress, goals } = dashboard;

    return (
        <div className="flex flex-col min-h-screen w-full p-8 min-w-0 min-h-0">
            <div className="flex-1 flex flex-col gap-8 min-w-0 min-h-0">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 flex-shrink-0 min-w-0 min-h-0">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Welcome back!</h1>
                        <p className="text-gray-300">Here's what's happening with your tasks and goals.</p>
                    </div>
                    <button className="glass-button flex items-center space-x-2 bg-gradient-to-r from-blue-500/60 to-purple-500/60 text-white shadow-lg px-6 py-3 rounded-lg">
                        <PlusIcon className="w-5 h-5" />
                        <span>New Task</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-cols-fr gap-6 w-full h-full min-w-0 min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel shadow-xl p-6 flex items-center space-x-4 w-full h-full min-w-0 min-h-0"
                    >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-md shadow-black/20">
                            <CheckCircleIcon className="w-7 h-7 text-white drop-shadow" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 font-medium">Tasks Completed</p>
                            <p className="text-3xl font-bold text-white drop-shadow-sm">{completedTasks}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel shadow-xl p-6 flex items-center space-x-4 w-full h-full min-w-0 min-h-0"
                    >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-md shadow-black/20">
                            <ClockIcon className="w-7 h-7 text-white drop-shadow" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 font-medium">Hours Tracked</p>
                            <p className="text-3xl font-bold text-white drop-shadow-sm">--</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel shadow-xl p-6 flex items-center space-x-4 w-full h-full min-w-0 min-h-0"
                    >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-md shadow-black/20">
                            <ChartBarIcon className="w-7 h-7 text-white drop-shadow" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 font-medium">Goals Progress</p>
                            <p className="text-3xl font-bold text-white drop-shadow-sm">{goalsProgress}%</p>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 auto-cols-fr gap-8 w-full h-full min-w-0 min-h-0">
                    {/* Upcoming Tasks */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-panel p-6 w-full h-full flex flex-col min-w-0 min-h-0"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Upcoming Tasks</h2>
                        <div className="space-y-4 min-w-0 min-h-0">
                            {upcomingTasks && upcomingTasks.length > 0 ? upcomingTasks.map((task) => (
                                <div key={task.id} className="flex flex-wrap items-center gap-2 justify-between p-3 rounded-xl bg-gray-900/70 border border-gray-700/60 shadow-inner w-full min-w-0 min-h-0">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0 min-h-0">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 accent-blue-500 rounded border-gray-700 bg-gray-800 focus:ring-blue-500"
                                        />
                                        <div className="min-w-0 flex-1 min-h-0">
                                            <p className="text-base font-medium text-white truncate">{task.title}</p>
                                            <p className="text-xs text-gray-400 truncate">Due {task.dueDate || task.due_date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                                </div>
                            )) : <div className="text-gray-400">No upcoming tasks.</div>}
                        </div>
                    </motion.div>

                    {/* Goals Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-panel p-6 w-full h-full flex flex-col min-w-0 min-h-0"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Goals Progress</h2>
                        <div className="space-y-6 min-w-0 min-h-0">
                            {goals && goals.length > 0 ? goals.map((goal) => (
                                <div key={goal.id} className="space-y-2 min-w-0 min-h-0">
                                    <div className="flex justify-between items-center min-w-0 min-h-0">
                                        <p className="text-base font-medium text-white">{goal.title}</p>
                                        <span className="text-xs text-gray-400">{goal.progress}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-800/70 rounded-full relative overflow-hidden min-w-0 min-h-0">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg shadow-blue-500/20 transition-all duration-300 min-w-0 min-h-0"
                                            style={{ width: `${goal.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )) : <div className="text-gray-400">No goals yet.</div>}
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Motivational Quote */}
            <div className="glass-panel p-8 text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 w-full min-w-0 min-h-0 mt-8">
                <p className="text-lg text-white font-medium italic drop-shadow">
                    "The only way to do great work is to love what you do."
                </p>
                <p className="text-sm text-gray-300 mt-2">- Steve Jobs</p>
            </div>
        </div>
    );
};

export default Dashboard; 