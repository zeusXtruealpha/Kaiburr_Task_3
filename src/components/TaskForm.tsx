import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateTaskRequest } from '../types';
import TaskService from '../services/taskService';

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
  onTaskCreationError: (errorMessage: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, onTaskCreationError }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateTaskRequest) => {
    setLoading(true);
    try {
      const newTask = await TaskService.createOrUpdateTask(values);
      form.resetFields();
      onTaskCreated(newTask);
    } catch (error: any) {
      // Enhanced error handling for malicious commands
      if (error.message.includes('unsafe') || error.message.includes('dangerous')) {
        onTaskCreationError('You cannot create malicious type as output for it');
      } else if (error.message.includes('Invalid task data')) {
        onTaskCreationError('Invalid task data. Please check all fields and try again.');
      } else {
        onTaskCreationError(`Failed to create task: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        aria-label="Create new task form"
      >
        <Form.Item
          label="Task ID"
          name="id"
          rules={[
            { required: true, message: 'Please enter a task ID' },
            { min: 1, message: 'Task ID must be at least 1 character' },
            { max: 50, message: 'Task ID must be less than 50 characters' }
          ]}
        >
          <Input 
            placeholder="Enter unique task ID"
            aria-describedby="task-id-help"
          />
        </Form.Item>
        <div id="task-id-help" className="sr-only">
          Enter a unique identifier for this task
        </div>

        <Form.Item
          label="Task Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter a task name' },
            { min: 1, message: 'Task name must be at least 1 character' },
            { max: 100, message: 'Task name must be less than 100 characters' }
          ]}
        >
          <Input 
            placeholder="Enter task name"
            aria-describedby="task-name-help"
          />
        </Form.Item>
        <div id="task-name-help" className="sr-only">
          Enter a descriptive name for this task
        </div>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[
            { required: true, message: 'Please enter the owner name' },
            { min: 1, message: 'Owner name must be at least 1 character' },
            { max: 50, message: 'Owner name must be less than 50 characters' }
          ]}
        >
          <Input 
            placeholder="Enter owner name"
            aria-describedby="owner-help"
          />
        </Form.Item>
        <div id="owner-help" className="sr-only">
          Enter the name of the person responsible for this task
        </div>

        <Form.Item
          label="Command"
          name="command"
          rules={[
            { required: true, message: 'Please enter a command' },
            { min: 1, message: 'Command must be at least 1 character' },
            { max: 500, message: 'Command must be less than 500 characters' }
          ]}
        >
          <Input.TextArea 
            rows={3}
            placeholder="Enter shell command to execute (e.g., echo Hello World, dir, systeminfo)"
            aria-describedby="command-help"
          />
        </Form.Item>
        <div id="command-help" className="sr-only">
          Enter the shell command to execute. Note: Dangerous commands like rm, sudo, etc. are blocked for security.
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={<PlusOutlined />}
            size="large"
            className="full-width"
          >
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
