import React, { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import { PlusIcon } from '@heroicons/react/24/outline';

const Tasks: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold gradient-text">Tasks</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center px-4 py-2 rounded-lg bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors duration-200"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Task
                </button>
            </div>

            <div className="flex-1 min-h-0">
                <TaskList />
            </div>

            {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
};

export default Tasks; 