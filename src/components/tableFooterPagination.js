import React from "react";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TablePaginationActions from "./tablePaginationActions";

const TableFooterPagination = (props) => {
  const {
    count,
    page,
    rowsPerPage,
    colSpan,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
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
