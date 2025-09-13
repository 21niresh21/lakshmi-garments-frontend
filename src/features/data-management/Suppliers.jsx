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
  { id: 2, label: "Supplier Name", width: 250, align: "center" },
  { id: 3, label: "Location", width: 200, align: "center" },
  { id: 4, label: "Actions", width: 100, align: "center" },
];

function Suppliers({ data, onSave, searchQuery, handleSearchQueryChange }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", location: "" });

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setFormValues({
      name: supplier.name,
      location: supplier.location,
    });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedSupplier(null);
    setFormValues({ name: "", location: "" });
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (onSave && selectedSupplier) {
      const updatedSupplier = {
        ...selectedSupplier,
        ...formValues,
      };
      onSave(updatedSupplier);
    }
    handleCloseModal();
  };

  return (
    <Paper>
      <TableSearchToolBar
        header={`Suppliers (${data.length})`}
        placeholder="Search Supplier Names"
        searchQuery={searchQuery}
        handleSearchChange={handleSearchQueryChange}
      />
      <TableContainer sx={{ maxHeight: 550 }}>
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
              data.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell
                    sx={{
                      minWidth: headers[0].width,
                      maxWidth: headers[0].width,
                      width: headers[0].width,
                    }}
                    align="center"
                  >
                    {supplier.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[1].width,
                      maxWidth: headers[1].width,
                      width: headers[1].width,
                    }}
                    align="center"
                  >
                    {supplier.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[2].width,
                      maxWidth: headers[2].width,
                      width: headers[2].width,
                    }}
                    align="center"
                  >
                    {supplier.location}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[3].width,
                      maxWidth: headers[3].width,
                      width: headers[3].width,
                    }}
                    align="center"
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(supplier)}
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
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Supplier Name"
            name="name"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            value={formValues.location}
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

export default Suppliers;
