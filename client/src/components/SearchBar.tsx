import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles((theme) => ({
  searchBarContainer: {
    width: '400px',
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: '400px',
    // },
  },
  outlineInputRoot: {
    // minHeight: theme.spacing(4.5),
    borderRadius: 0,
    // marginBottom: theme.spacing(3),
    // backgroundColor: theme.palette.background.default,
    '&:hover': {
      borderColor: 'transparent',
    },
  },
  outlineInputRootAdornedStart: {
    // paddingLeft: theme.spacing(1.5),
  },
  outlineInputRootAdornedEnd: {
    paddingRight: 0,
  },
  outlineInput: {
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    '&.MuiInputBase-input': {
      height: 'initial',
    },
  },
  notchedOutline: {
    borderColor: 'transparent',
  },
  iconButton: {
    // padding: theme.spacing(0.9375),
  },
}));
interface SearchBarProps {
  handleSearch: (searchText: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  handleSearch,
  placeholder,
}: SearchBarProps): JSX.Element => {
  const classes = useStyles();
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
      className={classes.searchBarContainer}
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
          classes: {
            root: classes.outlineInputRoot,
            adornedStart: classes.outlineInputRootAdornedStart,
            adornedEnd: classes.outlineInputRootAdornedEnd,
            input: classes.outlineInput,
            notchedOutline: classes.notchedOutline,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: showClearButton && (
            <IconButton
              id="clearSearch"
              aria-label="clear search"
              className={classes.iconButton}
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
