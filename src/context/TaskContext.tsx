import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'planvibe_tasks' as const;

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' };

interface TaskContextType extends TaskState {
    addTask: (taskData: TaskFormData) => void;
    updateTask: (taskId: string, taskData: Partial<Task>) => void;
    deleteTask: (taskId: string) => void;
    getTasksByStatus: (status: Task['status']) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const loadTasksFromStorage = (): Task[] => {
    return storage.get<Task[]>(STORAGE_KEY) || [];
};

const saveTasksToStorage = (tasks: Task[]): void => {
    storage.set(STORAGE_KEY, tasks);
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    let newState: TaskState;

    switch (action.type) {
        case 'SET_TASKS':
            newState = {
                ...state,
                tasks: action.payload,
                error: null,
            };
            break;
        case 'ADD_TASK':
            newState = {
                ...state,
                tasks: [...state.tasks, action.payload],
                error: null,
            };
            break;
        case 'UPDATE_TASK':
            newState = {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
                error: null,
            };
            break;
        case 'DELETE_TASK':
            newState = {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
                error: null,
            };
            break;
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

    // Save to localStorage for relevant actions
    if (action.type === 'ADD_TASK' || action.type === 'UPDATE_TASK' ||
        action.type === 'DELETE_TASK' || action.type === 'SET_TASKS') {
        saveTasksToStorage(newState.tasks);
    }

    return newState;
};

const initialState: TaskState = {
    tasks: loadTasksFromStorage(),
    isLoading: false,
    error: null,
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const loadedTasks = loadTasksFromStorage();
        if (loadedTasks.length > 0) {
            dispatch({ type: 'SET_TASKS', payload: loadedTasks });
        }
    }, []);

    const addTask = (taskData: TaskFormData) => {
        const newTask: Task = {
            id: uuidv4(),
            ...taskData,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
    };

    const updateTask = (taskId: string, taskData: Partial<Task>) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task) {
            dispatch({ type: 'SET_ERROR', payload: 'Task not found' });
            return;
        }

        const updatedTask: Task = {
            ...task,
            ...taskData,
            updatedAt: new Date().toISOString(),
        };
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    };

    const deleteTask = (taskId: string) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    };

    const getTasksByStatus = (status: Task['status']) => {
        return state.tasks.filter((task) => task.status === status);
    };

    const value = {
        ...state,
        addTask,
        updateTask,
        deleteTask,
        getTasksByStatus,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}; 