import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {
    PlusIcon,
    FlagIcon,
    CheckCircleIcon,
    ChartBarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { getGoals, createGoal, updateGoal, deleteGoal } from "../../api/goals";

const userId = 1; // Replace with actual logged-in user ID

// Add default goal templates
const goalTemplates = [
    { id: 1, title: "Read 12 Books", category: "Personal" },
    { id: 2, title: "Complete React Course", category: "Learning" },
    { id: 3, title: "Launch Side Project", category: "Work" },
];

const GoalView = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", category: "Work", progress: "", due_date: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getGoals(userId).then(data => {
            setGoals(Array.isArray(data) ? data : []);
            setLoading(false);
        });
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const progressValue = form.progress === "" ? 0 : Number(form.progress);
        if (editId) {
            const updated = await updateGoal(editId, { ...form, progress: progressValue, user_id: userId });
            setGoals(goals.map(g => (g.id === editId ? updated : g)));
            setEditId(null);
        } else {
            const newGoal = await createGoal({ ...form, progress: progressValue, user_id: userId });
            setGoals([...goals, newGoal]);
        }
        setForm({ title: "", description: "", category: "Work", progress: "", due_date: "" });
        setShowForm(false);
    };

    const handleEdit = goal => {
        setForm({
            title: goal.title,
            description: goal.description,
            category: goal.category,
            progress: goal.progress.toString(),
            due_date: goal.due_date ? goal.due_date.slice(0, 10) : "",
        });
        setEditId(goal.id);
        setShowForm(true);
    };

    const handleDelete = async id => {
        await deleteGoal(id);
        setGoals(goals.filter(g => g.id !== id));
    };

    if (loading) return <div>Loading...</div>;

    const getCategoryColor = (category) => {
        if (!category || typeof category !== "string") return 'bg-gray-100 text-gray-900';
        switch (category.toLowerCase()) {
            case 'work':
                return 'bg-mint/40 text-gray-900';
            case 'learning':
                return 'bg-coral/40 text-gray-900';
            case 'personal':
                return 'bg-lavender/40 text-gray-900';
            default:
                return 'bg-gray-100 text-gray-900';
        }
    };

    const renderGoalCard = (goal) => {
        return (
            <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg w-full min-w-0"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                        <p className="text-gray-600 mt-1">{goal.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(goal.category)}`}>{goal.category}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-2 bg-gradient-to-r from-mint to-coral rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                        />
                    </div>
                </div>

                {/* Due date */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm">Due {goal.due_date ? goal.due_date.slice(0, 10) : "N/A"}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-mint hover:text-mint/80" onClick={() => handleEdit(goal)}>
                            Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(goal.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-8 w-full min-w-0 p-8">
            {/* Header */}
            <div className="flex justify-between items-center w-full min-w-0">
                <div>
                    <h1 className="text-3xl font-bold text-white">Goals</h1>
                    <p className="text-gray-300">Track and manage your personal and professional goals</p>
                </div>
                <button className="glass-button flex items-center space-x-2" onClick={() => { setShowForm(true); setEditId(null); }}>
                    <PlusIcon className="w-5 h-5" />
                    <span>New Goal</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-w-0">
                {[
                    { icon: FlagIcon, title: 'Active Goals', value: goals.length },
                    { icon: CheckCircleIcon, title: 'Completed Goals', value: '2' },
                    { icon: ChartBarIcon, title: 'Average Progress', value: '47%' },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card bg-gray-900 flex items-center space-x-4 w-full min-w-0"
                    >
                        <div className="p-3 rounded-lg bg-mint/10">
                            <stat.icon className="w-6 h-6 text-mint" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 font-medium">{stat.title}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Goal Templates */}
            <div className="card bg-gray-900 w-full min-w-0">
                <h2 className="text-xl font-bold text-white mb-4">Quick Start Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
                    {goalTemplates.map((template) => (
                        <button
                            key={template.id}
                            className="p-4 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full min-w-0"
                        >
                            <h3 className="font-medium text-white">{template.title}</h3>
                            <p className="text-sm text-gray-300 mt-1">{template.category}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full min-w-0">
                {goals.map(renderGoalCard)}
            </div>

            {/* Goal Form Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <form
                        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-xl font-bold text-gray-900">{editId ? "Edit Goal" : "New Goal"}</h2>
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="input-field" />
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input-field" />
                        <select name="category" value={form.category} onChange={handleChange} className="input-field">
                            <option>Work</option>
                            <option>Learning</option>
                            <option>Personal</option>
                        </select>
                        <input name="progress" type="number" min="0" max="100" value={form.progress} onChange={handleChange} placeholder="Progress (%)" className="input-field" />
                        <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="input-field" />
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

export default GoalView; 