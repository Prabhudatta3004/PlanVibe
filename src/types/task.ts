export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];

export interface TaskFormData {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
    tags: string[];
} 