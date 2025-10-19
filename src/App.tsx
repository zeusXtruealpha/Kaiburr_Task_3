import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Alert } from 'antd';
import { TagsOutlined } from '@ant-design/icons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import { Task } from './types';
import TaskService from './services/taskService';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [outputMessage, setOutputMessage] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Load all tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await TaskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    
    try {
      if (query.trim()) {
        const searchResults = await TaskService.searchTasksByName(query);
        setTasks(searchResults);
      } else {
        await loadTasks();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setError(null);
    setOutputMessage({
      type: 'success',
      message: `Task successfully created with ID: ${newTask.id}`
    });
  };

  const handleTaskCreationError = (errorMessage: string) => {
    setOutputMessage({
      type: 'error',
      message: errorMessage
    });
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setError(null);
  };

  const handleTaskExecuted = (taskId: string, execution: any) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, taskExecutions: [...(task.taskExecutions || []), execution] }
          : task
      )
    );
  };

  const clearError = () => {
    setError(null);
  };

  const clearOutputMessage = () => {
    setOutputMessage(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Space align="center">
          <TagsOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            Task Management System
          </Title>
        </Space>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" className="full-width">
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              onClose={clearError}
              style={{ marginBottom: '16px' }}
            />
          )}

          <div>
            <Title level={2}>Create New Task</Title>
            <TaskForm onTaskCreated={handleTaskCreated} onTaskCreationError={handleTaskCreationError} />
          </div>

          {/* Output Box */}
          {outputMessage && (
            <div>
              <Alert
                message={outputMessage.type === 'success' ? 'Success' : 'Error'}
                description={outputMessage.message}
                type={outputMessage.type}
                showIcon
                closable
                onClose={clearOutputMessage}
                style={{ marginBottom: '16px' }}
              />
            </div>
          )}

          <div>
            <Title level={2}>Search Tasks</Title>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>

          <div>
            <Title level={2}>
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Tasks'}
            </Title>
            <TaskList
              tasks={tasks}
              loading={loading}
              onTaskDeleted={handleTaskDeleted}
              onTaskExecuted={handleTaskExecuted}
            />
          </div>
        </Space>
      </Content>
    </Layout>
  );
};

export default App;
