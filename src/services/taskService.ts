import axios, { AxiosResponse } from 'axios';
import { Task, TaskExecution, CreateTaskRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class TaskService {
  /**
   * Get all tasks
   */
  static async getAllTasks(): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await api.get('/tasks');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
    }
  }

  /**
   * Get task by ID
   */
  static async getTaskById(id: string): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await api.get(`/tasks?id=${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      throw new Error(error.response?.data?.error || 'Failed to fetch task');
    }
  }

  /**
   * Search tasks by name
   */
  static async searchTasksByName(name: string): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await api.get(`/tasks/search?name=${encodeURIComponent(name)}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return []; // Return empty array if no tasks found
      }
      throw new Error(error.response?.data?.error || 'Failed to search tasks');
    }
  }

  /**
   * Create or update a task
   */
  static async createOrUpdateTask(task: CreateTaskRequest): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await api.put('/tasks', task);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.error || 'Invalid task data or unsafe command');
      }
      throw new Error(error.response?.data?.error || 'Failed to save task');
    }
  }

  /**
   * Delete a task
   */
  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      throw new Error(error.response?.data?.error || 'Failed to delete task');
    }
  }

  /**
   * Execute a task
   */
  static async executeTask(id: string): Promise<TaskExecution> {
    try {
      const response: AxiosResponse<TaskExecution> = await api.put(`/tasks/${id}/execute`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.error || 'Unsafe command detected');
      }
      throw new Error(error.response?.data?.error || 'Failed to execute task');
    }
  }
}

export default TaskService;
