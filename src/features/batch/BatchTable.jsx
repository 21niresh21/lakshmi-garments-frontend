import { Paper, Table, TableContainer } from "@mui/material";
import BatchTableHeader from "./BatchTableHeader";


function BatchTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <BatchTableHeader />
      </Table>
    </TableContainer>
  );
}

export default BatchTable;

