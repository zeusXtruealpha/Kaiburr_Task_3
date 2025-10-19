import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Popconfirm, 
  message, 
  Divider,
  Collapse,
  Badge
} from 'antd';
import { 
  PlayCircleOutlined, 
  DeleteOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  CodeOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Task, TaskExecution } from '../types';
import TaskService from '../services/taskService';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface TaskCardProps {
  task: Task;
  onTaskDeleted: (taskId: string) => void;
  onTaskExecuted: (taskId: string, execution: TaskExecution) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onTaskDeleted, 
  onTaskExecuted 
}) => {
  const [executing, setExecuting] = useState(false);

  const handleExecute = async () => {
    setExecuting(true);
    try {
      const execution = await TaskService.executeTask(task.id);
      message.success(`Task successfully executed with ID: ${task.id}`);
      onTaskExecuted(task.id, execution);
    } catch (error: any) {
      // Enhanced error handling for malicious commands during execution
      if (error.message.includes('unsafe') || error.message.includes('dangerous')) {
        message.error({
          content: (
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                🚫 Execution Blocked - Malicious Command!
              </div>
              <div style={{ marginBottom: '8px' }}>
                Cannot execute "{task.command}" - contains dangerous operations.
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                This command was blocked by security validation. Please use safe commands only.
              </div>
            </div>
          ),
          duration: 8,
        });
      } else if (error.message.includes('not found')) {
        message.error('Task not found. It may have been deleted.');
      } else {
        message.error(`Execution failed: ${error.message}`);
      }
    } finally {
      setExecuting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await TaskService.deleteTask(task.id);
      message.success(`Task successfully deleted with ID: ${task.id}`);
      onTaskDeleted(task.id);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
  };

  const getExecutionStatus = (execution: TaskExecution) => {
    // Simple heuristic: if output contains "Error" or "failed", consider it failed
    const output = execution.output.toLowerCase();
    if (output.includes('error') || output.includes('failed') || output.includes('exit code')) {
      return 'error';
    }
    return 'success';
  };

  return (
    <Card
      title={
        <div>
          <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
            {task.name}
          </Title>
          <Space>
            <Tag color="blue">{task.id}</Tag>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleExecute}
              loading={executing}
              size="small"
              aria-label={`Execute task ${task.name}`}
            >
              Execute
            </Button>
            <Popconfirm
              title="Delete Task"
              description="Are you sure you want to delete this task?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                aria-label={`Delete task ${task.name}`}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      }
      style={{ height: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div>
          <Space>
            <UserOutlined />
            <Text strong>Owner:</Text>
            <Text>{task.owner}</Text>
          </Space>
        </div>

        <div>
          <Space align="start">
            <CodeOutlined />
            <div style={{ flex: 1 }}>
              <Text strong>Command:</Text>
              <Paragraph 
                code 
                style={{ 
                  margin: '4px 0 0 0', 
                  wordBreak: 'break-all',
                  fontSize: '12px'
                }}
              >
                {task.command}
              </Paragraph>
            </div>
          </Space>
        </div>

        {task.taskExecutions && task.taskExecutions.length > 0 && (
          <div>
            <Divider style={{ margin: '12px 0' }} />
            <Collapse size="small" ghost>
              <Panel 
                header={
                  <Space>
                    <HistoryOutlined />
                    <Text strong>Execution History</Text>
                    <Badge 
                      count={task.taskExecutions.length} 
                      style={{ backgroundColor: '#52c41a' }} 
                    />
                  </Space>
                } 
                key="1"
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {task.taskExecutions.slice(-5).reverse().map((execution) => (
                    <Card 
                      key={execution.id} 
                      size="small"
                      style={{ 
                        backgroundColor: getExecutionStatus(execution) === 'error' ? '#fff2f0' : '#f6ffed',
                        border: getExecutionStatus(execution) === 'error' ? '1px solid #ffccc7' : '1px solid #b7eb8f'
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div>
                          <Space>
                            <ClockCircleOutlined />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {formatDate(execution.startTime)} - {formatDate(execution.endTime)}
                            </Text>
                            <Tag 
                              color={getExecutionStatus(execution) === 'error' ? 'red' : 'green'}
                              style={{ fontSize: '10px' }}
                            >
                              {getExecutionStatus(execution) === 'error' ? 'Failed' : 'Success'}
                            </Tag>
                          </Space>
                        </div>
                        <div>
                          <Text strong style={{ fontSize: '12px' }}>Output:</Text>
                          <Paragraph 
                            style={{ 
                              margin: '4px 0 0 0',
                              fontSize: '11px',
                              fontFamily: 'monospace',
                              backgroundColor: '#f5f5f5',
                              padding: '8px',
                              borderRadius: '4px',
                              maxHeight: '100px',
                              overflow: 'auto',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word'
                            }}
                          >
                            {execution.output}
                          </Paragraph>
                        </div>
                      </Space>
                    </Card>
                  ))}
                  {task.taskExecutions.length > 5 && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Showing last 5 executions. Total: {task.taskExecutions.length}
                    </Text>
                  )}
                </Space>
              </Panel>
            </Collapse>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default TaskCard;
