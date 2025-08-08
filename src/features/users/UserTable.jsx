import React from 'react'
import { Paper, Table, TableContainer } from "@mui/material";
import UserTableHeader from './UserTableHeader';

function UserTable() {
  return (
    <TableContainer component={Paper}>
          <Table>
            <UserTableHeader />
          </Table>
        </TableContainer>
  )
}

export default UserTable