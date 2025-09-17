// table/DataTable.jsx
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Paper,
  TableContainer,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NoDataTable from "../../components/NoDataTable";

export default function DataTable({ columns, rows, onEdit, toolbar }) {
  return (
    <Paper>
      {toolbar && <Box>{toolbar}</Box>}
      <TableContainer sx={{ maxHeight: 550 }}>
        <Divider />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>{row[col.field]}</TableCell>
                  ))}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => onEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoDataTable />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
