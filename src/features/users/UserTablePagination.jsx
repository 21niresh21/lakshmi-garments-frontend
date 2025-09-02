import { TablePagination } from "@mui/material";

function UserTablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  console.log(count);
  return (
    <TablePagination
      component="div"
      count={count}
      rowsPerPageOptions={[5, 10, 25]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      onPageChange={onPageChange}
    />
    
  );
}

export default UserTablePagination;
