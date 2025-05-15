import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/task';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const TaskList: React.FC = () => {
    const { tasks, updateTask, deleteTask } = useTaskContext();

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;
        const newStatus = destination.droppableId as Task['status'];

        updateTask(draggableId, { status: newStatus });
    };

    const getTasksByColumn = (status: Task['status']) => {
        return tasks.filter(task => task.status === status);
    };

    const columns = [
        { id: 'todo', title: 'To Do', color: 'from-pink-500/20 to-purple-500/20' },
        { id: 'in-progress', title: 'In Progress', color: 'from-blue-500/20 to-cyan-500/20' },
        { id: 'completed', title: 'Completed', color: 'from-green-500/20 to-emerald-500/20' }
    ] as const;

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high':
                return 'text-red-400';
            case 'medium':
                return 'text-yellow-400';
            case 'low':
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    const handleDeleteTask = (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(taskId);
        }
    };

    return (
        <div className="h-full">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    {columns.map(({ id, title, color }) => (
                        <div key={id} className="flex flex-col h-full">
                            <h2 className="text-xl font-semibold mb-4 gradient-text">{title}</h2>
                            <Droppable droppableId={id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`flex-1 p-4 rounded-lg bg-gradient-to-br ${color} glass-panel min-h-[200px]`}
                                    >
                                        {getTasksByColumn(id as Task['status']).map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="mb-3 p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="font-medium text-gray-100">{task.title}</h3>
                                                                <p className="mt-2 text-sm text-gray-300">{task.description}</p>
                                                            </div>
                                                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => handleDeleteTask(task.id)}
                                                                    className="p-1 rounded-lg hover:bg-red-500/20 text-red-400"
                                                                >
                                                                    <TrashIcon className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)} bg-gray-700/30`}>
                                                                    {task.priority}
                                                                </span>
                                                                <span className="text-gray-400">
                                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {task.tags.length > 0 && (
                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                {task.tags.map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="px-2 py-1 rounded-full bg-gray-700/30 text-xs text-gray-300"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList; 