import {
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import TableSearchToolBar from "./TableSearchToolBar";
import EditIcon from "@mui/icons-material/Edit";
import NoDataTable from "../../components/NoDataTable";
import { useState } from "react";
import { HeaderCell } from "../../components/styled";

const headers = [
  { id: 1, label: "ID", width: 80, align: "center" },
  { id: 2, label: "Transport Name", width: 250, align: "center" },
  { id: 3, label: "Actions", width: 100, align: "center" },
];

function Transports({ data, onSave, searchQuery, handleSearchQueryChange }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [formValues, setFormValues] = useState({ name: "" });

  const handleEditClick = (transport) => {
    setSelectedTransport(transport);
    setFormValues({ name: transport.name });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedTransport(null);
    setFormValues({ name: "" });
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (onSave && selectedTransport) {
      const updatedTransport = {
        ...selectedTransport,
        ...formValues,
      };
      onSave(updatedTransport);
    }
    handleCloseModal();
  };

  return (
    <Paper>
      <TableSearchToolBar
        header={`Transports (${data.length})`}
        placeholder="Search Transport Names"
        searchQuery={searchQuery}
        handleSearchChange={handleSearchQueryChange}
      />
      <TableContainer sx={{ maxHeight: 600 }}>
        <Divider />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map(({ id, label, width, align }) => (
                <HeaderCell
                  key={id}
                  sx={{ minWidth: width, maxWidth: width, width: width }}
                  align={align}
                >
                  {label}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    sx={{
                      minWidth: headers[0].width,
                      maxWidth: headers[0].width,
                      width: headers[0].width,
                    }}
                    align="center"
                  >
                    {item.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[1].width,
                      maxWidth: headers[1].width,
                      width: headers[1].width,
                    }}
                    align="center"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[2].width,
                      maxWidth: headers[2].width,
                      width: headers[2].width,
                    }}
                    align="center"
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoDataTable colSpan={headers.length} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Edit Transport</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Transport Name"
            name="name"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Transports;
