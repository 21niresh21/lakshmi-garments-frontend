import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getBatches } from "../../api/batchApi";
import { formatDateToVerbose } from "../../utils/dateUtils";

function Row(props) {
  const { row } = props;
  console.log("dog", row);

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.serialCode}
        </TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">
          {formatDateToVerbose(row.createdAt)}
        </TableCell>
        <TableCell>
          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Categories
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row &&
                    row.subCategories.map((historyRow) => (
                      <TableRow key={historyRow.subCategory}>
                        <TableCell component="th" scope="row">
                          {historyRow.subCategory}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Batch() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getBatches(search).then((res) => {
      setRows(res);
      console.log("cat", res);
    });
  }, [search]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 3 }}>
      <TextField
        sx={{ alignSelf: "flex-end", width: 300 }}
        size="small"
        placeholder="Search serial code"
        value={search}
        onChange={handleSearch}
      />
      <TableContainer component={Paper} sx={{ mr: 5, mt: 3 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Serial Code</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => <Row key={row.name} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Batch;
