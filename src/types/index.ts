export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions?: TaskExecution[];
}

export interface TaskExecution {
  id: string;
  startTime: string;
  endTime: string;
  output: string;
}

export interface CreateTaskRequest {
  id: string;
  name: string;
  owner: string;
  command: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchParams {
  name?: string;
  id?: string;
}
