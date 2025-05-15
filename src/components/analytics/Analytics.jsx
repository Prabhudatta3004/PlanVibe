import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'

    // Mock data
    const productivityData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [4, 6, 8, 5, 7, 3, 2],
                borderColor: '#98FF98',
                backgroundColor: 'rgba(152, 255, 152, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const categoryData = {
        labels: ['Work', 'Personal', 'Learning', 'Health', 'Social'],
        datasets: [
            {
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(152, 255, 152, 0.8)', // mint
                    'rgba(255, 127, 80, 0.8)', // coral
                    'rgba(230, 230, 250, 0.8)', // lavender
                    'rgba(255, 182, 193, 0.8)', // pink
                    'rgba(135, 206, 235, 0.8)', // sky blue
                ],
                borderWidth: 0,
            },
        ],
    };

    const timeDistributionData = {
        labels: ['Morning', 'Afternoon', 'Evening'],
        datasets: [
            {
                label: 'Hours Spent',
                data: [4, 6, 2],
                backgroundColor: [
                    'rgba(152, 255, 152, 0.8)',
                    'rgba(255, 127, 80, 0.8)',
                    'rgba(230, 230, 250, 0.8)',
                ],
            },
        ],
    };

    const stats = [
        {
            id: 1,
            name: 'Tasks Completed',
            value: '32',
            change: '+12%',
            icon: CheckCircleIcon,
        },
        {
            id: 2,
            name: 'Hours Tracked',
            value: '64.5',
            change: '+8%',
            icon: ClockIcon,
        },
        {
            id: 3,
            name: 'Productivity Score',
            value: '85',
            change: '+5%',
            icon: ChartBarIcon,
        },
        {
            id: 4,
            name: 'Active Days',
            value: '6/7',
            change: '+1 day',
            icon: CalendarIcon,
        },
    ];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        cutout: '70%',
    };

    return (
        <div className="flex flex-col min-h-screen w-full p-8 min-w-0 min-h-0">
            <div className="flex-1 flex flex-col gap-8 min-w-0 min-h-0">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
                    <p className="text-gray-300">Track your productivity and task completion patterns</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg w-fit">
                    {['week', 'month', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${timeRange === range
                                ? 'bg-white shadow-sm text-gray-800'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-lg bg-mint/10">
                                    <stat.icon className="w-6 h-6 text-mint" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{stat.name}</p>
                                    <div className="flex items-baseline space-x-2">
                                        <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                                        <span className="text-xs font-medium text-green-600">{stat.change}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Productivity Trend */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4">Productivity Trend</h2>
                        <Line data={productivityData} options={chartOptions} />
                    </motion.div>

                    {/* Time Distribution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4">Time Distribution</h2>
                        <Bar data={timeDistributionData} options={chartOptions} />
                    </motion.div>

                    {/* Category Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card col-span-1 lg:col-span-2"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4">Task Categories</h2>
                        <div className="max-w-md mx-auto">
                            <Doughnut data={categoryData} options={doughnutOptions} />
                        </div>
                    </motion.div>
                </div>

                {/* Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-gradient-to-r from-mint/10 via-coral/10 to-lavender/10"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">Key Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-medium text-gray-800">Most Productive Time</h3>
                            <p className="text-gray-600 mt-1">Your productivity peaks in the afternoon (2-4 PM)</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-medium text-gray-800">Task Completion Rate</h3>
                            <p className="text-gray-600 mt-1">85% of tasks completed within deadline</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-medium text-gray-800">Focus Areas</h3>
                            <p className="text-gray-600 mt-1">Work tasks take up most of your time (35%)</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-medium text-gray-800">Improvement Areas</h3>
                            <p className="text-gray-600 mt-1">Consider allocating more time to health goals</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics; 