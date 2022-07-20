import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableFooterPagination from './tableFooterPagination';

const renderTableRow = ({ _id, title, platform }) => {
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
    </TableRow>
  );
};

export const GamesTable = ({ games }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tableRows = [
    ...games.map((game) => renderTableRow({ ...game })),
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 300 }}
        size="small"
        aria-label="Change History"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Platform</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.length > 0
            ? rowsPerPage > 0
              ? tableRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableRows
            : null}
        </TableBody>
        {games.length > 10 ? (
          <TableFooterPagination
            count={games.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            colSpan={6}
          />
        ) : null}
      </Table>
    </TableContainer>
  );
};
