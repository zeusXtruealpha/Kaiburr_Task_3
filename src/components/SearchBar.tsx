import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        placeholder="Search tasks by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ flex: 1 }}
        aria-label="Search tasks by name"
        aria-describedby="search-help"
      />
      <Button 
        type="primary" 
        icon={<SearchOutlined />}
        onClick={handleSearch}
        loading={loading}
        aria-label="Search tasks"
      >
        Search
      </Button>
      <Button 
        icon={<ReloadOutlined />}
        onClick={handleClear}
        disabled={loading}
        aria-label="Clear search and show all tasks"
      >
        Clear
      </Button>
      <div id="search-help" className="sr-only">
        Enter a task name to search for specific tasks. Leave empty to show all tasks.
      </div>
    </Space.Compact>
  );
};

export default SearchBar;
