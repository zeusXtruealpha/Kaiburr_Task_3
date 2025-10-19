import React from 'react';
import { List, Empty, Spin } from 'antd';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onTaskDeleted: (taskId: string) => void;
  onTaskExecuted: (taskId: string, execution: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  loading, 
  onTaskDeleted, 
  onTaskExecuted 
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Empty
        description="No tasks found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <List
      grid={{ 
        gutter: 16, 
        xs: 1, 
        sm: 1, 
        md: 2, 
        lg: 2, 
        xl: 3, 
        xxl: 3 
      }}
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <TaskCard
            task={task}
            onTaskDeleted={onTaskDeleted}
            onTaskExecuted={onTaskExecuted}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
