// Utility functions for the application

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const isValidCommand = (command: string): boolean => {
  // Basic validation - can be extended
  return command.trim().length > 0 && command.length <= 500;
};

export const getCommandType = (command: string): string => {
  const cmd = command.toLowerCase().trim();
  if (cmd.startsWith('echo')) return 'echo';
  if (cmd.startsWith('dir') || cmd.startsWith('ls')) return 'list';
  if (cmd.startsWith('ping')) return 'network';
  if (cmd.startsWith('systeminfo') || cmd.startsWith('uname')) return 'system';
  return 'other';
};
