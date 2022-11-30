import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface SearchBarProps {
  handleSearch: (searchText: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  handleSearch,
  placeholder,
}: SearchBarProps): JSX.Element => {
  const [searchText, setSearchText] = useState('');

  const clearAndHandleSearch = () => {
    setSearchText('');
    handleSearch('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchText);
  };

  const showClearButton = !!searchText;

  return (
    <form
      style={{ width: 400 }}
      autoComplete="off"
      noValidate
      role="search"
      onSubmit={onSubmit}
    >
      <TextField
        id="search-input"
        type="text"
        variant="outlined"
        fullWidth
        hiddenLabel
        inputProps={{ 'aria-label': 'Search for Store' }}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: showClearButton && (
            <IconButton
              id="clearSearch"
              aria-label="clear search"
              onClick={clearAndHandleSearch}
            >
              <CloseIcon />
            </IconButton>
          ),
        }}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </form>
  );
};

export default SearchBar;
