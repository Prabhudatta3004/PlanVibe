import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {
    ViewColumnsIcon,
    CalendarIcon,
    ListBulletIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { getTasks, createTask, updateTask, deleteTask } from "../../api/tasks";

// Replace with actual logged-in user ID from auth context/session
const userId = 1;

const TaskView = () => {
    const [view, setView] = useState('list'); // 'list', 'calendar', 'kanban'
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", due_date: "", status: "To Do", priority: "Medium" });
    const [editId, setEditId] = useState(null);

    // Fetch tasks on mount
    useEffect(() => {
        getTasks(userId).then(data => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    // Handle form input
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // Create or update task
    const handleSubmit = async e => {
        e.preventDefault();
        if (editId) {
            const updated = await updateTask(editId, { ...form, user_id: userId });
            setTasks(tasks.map(t => (t.id === editId ? updated : t)));
            setEditId(null);
        } else {
            const newTask = await createTask({ ...form, user_id: userId });
            setTasks([...tasks, newTask]);
        }
        setForm({ title: "", description: "", due_date: "", status: "To Do", priority: "Medium" });
        setShowForm(false);
    };

    // Edit a task
    const handleEdit = task => {
        setForm({
            title: task.title,
            description: task.description,
            due_date: task.due_date ? task.due_date.slice(0, 10) : "",
            status: task.status,
            priority: task.priority,
        });
        setEditId(task.id);
        setShowForm(true);
    };

    // Delete a task
    const handleDelete = async id => {
        await deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
    };

    // Mark as complete
    const handleComplete = async task => {
        const updated = await updateTask(task.id, { ...task, status: "Done", user_id: userId });
        setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
    };

    const viewOptions = [
        { id: 'list', name: 'List', icon: ListBulletIcon },
        { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
        { id: 'kanban', name: 'Kanban', icon: ViewColumnsIcon },
    ];

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Done':
                return 'bg-green-700 text-white';
            case 'In Progress':
                return 'bg-blue-700 text-white';
            case 'To Do':
                return 'bg-gray-700 text-white';
            default:
                return 'bg-gray-700 text-white';
        }
    };

    // List View
    const renderListView = () => (
        <div className="grid grid-cols-1 gap-6 w-full min-w-0 min-h-0">
            {tasks.map((task) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full min-w-0 min-h-0"
                >
                    <div className="flex items-start gap-4 flex-1 min-w-0 min-h-0">
                        <input
                            type="checkbox"
                            className="h-5 w-5 mt-1 accent-blue-500 rounded border-gray-700 bg-gray-800 focus:ring-blue-500"
                        />
                        <div className="min-w-0 flex-1 min-h-0">
                            <h3 className="text-lg font-bold text-white truncate">{task.title}</h3>
                            <p className="text-sm text-gray-300 mt-1 truncate">{task.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                                <span className="text-xs text-gray-400">Due {task.due_date ? task.due_date.slice(0, 10) : "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Calendar View
    const renderCalendarView = () => (
        <div className="glass-panel p-6 w-full min-w-0 min-h-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">March 2024</h2>
                <div className="flex space-x-2">
                    <button className="p-2 rounded-lg bg-gray-800/50 text-white hover:bg-blue-500/20 transition">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-800/50 text-white hover:bg-blue-500/20 transition">
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-4 min-h-[120px]">
                {/* Calendar implementation will go here */}
                <div className="text-center text-gray-400 col-span-7">Calendar View Coming Soon</div>
            </div>
        </div>
    );

    // Kanban View
    const renderKanbanView = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-w-0 min-h-0">
            {['To Do', 'In Progress', 'Done'].map((status) => (
                <div key={status} className="glass-panel p-4 flex flex-col min-w-0 min-h-0">
                    <h3 className="text-lg font-semibold text-white mb-4">{status}</h3>
                    <div className="space-y-4">
                        {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 bg-gray-900/70 rounded-lg flex flex-col gap-2 min-w-0 min-h-0"
                                >
                                    <h4 className="font-bold text-white truncate">{task.title}</h4>
                                    <p className="text-sm text-gray-300 truncate">{task.description}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                                        <span className="text-xs text-gray-400">Due {task.due_date ? task.due_date.slice(0, 10) : "N/A"}</span>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen w-full p-8 min-w-0 min-h-0">
            <div className="flex-1 flex flex-col gap-8 min-w-0 min-h-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 flex-shrink-0 min-w-0 min-h-0">
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text">Tasks</h1>
                    <button className="glass-button flex items-center space-x-2" onClick={() => { setShowForm(true); setEditId(null); }}>
                        <PlusIcon className="w-5 h-5" />
                        <span>New Task</span>
                    </button>
                </div>

                {/* View Toggle */}
                <div className="flex space-x-2 w-fit mb-4 bg-gray-800/60 p-1 rounded-xl">
                    {viewOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setView(option.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 font-semibold text-sm
                                ${view === option.id
                                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'bg-gray-900/60 text-gray-300 hover:bg-gray-700/70 hover:text-white'}
                            `}
                        >
                            <option.icon className="w-5 h-5" />
                            <span>{option.name}</span>
                        </button>
                    ))}
                </div>

                {/* View Content */}
                {view === 'list' && renderListView()}
                {view === 'calendar' && renderCalendarView()}
                {view === 'kanban' && renderKanbanView()}
            </div>
            {/* Motivational Quote */}
            <div className="glass-panel p-8 text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 w-full min-w-0 min-h-0 mt-8">
                <p className="text-lg text-white font-medium italic drop-shadow">
                    "The only way to do great work is to love what you do."
                </p>
                <p className="text-sm text-gray-300 mt-2">- Steve Jobs</p>
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <form
                        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-xl font-bold text-gray-900">{editId ? "Edit Task" : "New Task"}</h2>
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="input-field" />
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input-field" />
                        <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="input-field" />
                        <select name="status" value={form.status} onChange={handleChange} className="input-field">
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>
                        <select name="priority" value={form.priority} onChange={handleChange} className="input-field">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <div className="flex gap-2">
                            <button type="submit" className="btn-primary">{editId ? "Update" : "Create"}</button>
                            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskView; 