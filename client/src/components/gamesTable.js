import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableFooterPagination from './tableFooterPagination';
import Button from '@mui/material/Button';
import { deleteGame } from '../api/games';

const renderTableRow = ({
  _id,
  title,
  platform,
  setOpen,
  setIsEdit,
  setTitle,
  setPlatform,
  setId,
  setTriggerRefresh,
}) => {
  const handleEditGame = () => {
    setOpen(true);
    setIsEdit(true);
    setTitle(title);
    setPlatform(platform);
    setId(_id);
  };

  const handleDeleteGame = async () => {
    try {
      const removeGame = await deleteGame(_id);
      if (removeGame) {
        alert('Game successfully deleted.');
        setTriggerRefresh(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow
      key={_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Typography>{title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{platform}</Typography>
      </TableCell>
      <TableCell>
        <Button onClick={handleEditGame}>Edit Game</Button>
      </TableCell>
      <TableCell>
        <Button onClick={handleDeleteGame}>Delete Game</Button>
      </TableCell>
    </TableRow>
  );
};

export const GamesTable = ({
  games,
  setOpen,
  setIsEdit,
  setTitle,
  setPlatform,
  setId,
  setTriggerRefresh,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    if (filter === '' || filter === 'All Platforms') {
      setVideoGames(games);
    } else {
      setVideoGames([
        ...games.filter((game) => game.platform === filter),
      ]);
    }
  }, [games, filter]);

  const tableRows = [
    ...videoGames
      .sort((game1, game2) => {
        return game1.title === game2.title
          ? 0
          : game1.title > game2.title
          ? 1
          : -1;
      })
      .map((game) =>
        renderTableRow({
          ...game,
          setOpen,
          setIsEdit,
          setTitle,
          setPlatform,
          setId,
          setTriggerRefresh,
        })
      ),
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const menuItems = [
    'All Platforms',
    'Nintendo 64',
    'Super Nintendo',
    'Nintendo',
  ];

  const tableHeaders = ['Title', 'Platform', '', ''];

  return (
    <Box>
      <Box my={2}>
        <FormControl style={{ width: '200px' }}>
          <InputLabel id="platform">Platform</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            value={filter}
            label="Filter by Platform"
            onChange={handleFilterChange}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300 }}
          size="small"
          aria-label="Video Game Inventory"
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {videoGames.length > 0
              ? rowsPerPage > 0
                ? tableRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tableRows
              : null}
          </TableBody>
          {videoGames.length > 10 ? (
            <TableFooterPagination
              count={videoGames.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              colSpan={6}
            />
          ) : null}
        </Table>
      </TableContainer>
    </Box>
  );
};
