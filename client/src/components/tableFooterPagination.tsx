import React, { ChangeEvent } from 'react';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TablePaginationActions from './tablePaginationActions';

interface TableFooterPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  colSpan: number;
  onChangePage: any;
  onChangeRowsPerPage: (
    event: ChangeEvent<{ value: string }>
  ) => void;
}

const TableFooterPagination = ({
  count,
  page,
  rowsPerPage,
  colSpan,
  onChangePage,
  onChangeRowsPerPage,
}: TableFooterPaginationProps) => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            25,
            { label: 'All', value: -1 },
          ]}
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default TableFooterPagination;
