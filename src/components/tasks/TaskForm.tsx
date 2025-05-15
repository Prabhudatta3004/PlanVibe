import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { TaskFormData, TaskPriority } from '../../types/task';

interface TaskFormProps {
    onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
    const { addTask } = useTaskContext();
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
        tags: [],
    });
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask(formData);
        onClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()],
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 gradient-text">New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-blue-500/50"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-blue-500/50"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded-full bg-gray-700/50 text-sm text-gray-300 flex items-center"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-400 hover:text-gray-200"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            id="tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Add tags (press Enter)"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors duration-200"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm; 