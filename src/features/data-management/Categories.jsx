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
  { id: 2, label: "Category Name", width: 250, align: "center" },
  { id: 3, label: "Category Code", width: 150, align: "center" },
  { id: 4, label: "Actions", width: 100, align: "center" },
];

function Categories({ data, onSave, searchQuery, handleSearchQueryChange }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", code: "" });

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormValues({ name: category.name, code: category.code });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedCategory(null);
    setFormValues({ name: "", code: "" });
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (onSave && selectedCategory) {
      const updatedCategory = {
        ...selectedCategory,
        ...formValues,
      };
      onSave(updatedCategory);
    }
    handleCloseModal();
  };

  return (
    <Paper>
      <TableSearchToolBar
        header={`Categories (${data.length})`}
        placeholder="Search Category Names"
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
              data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell
                    sx={{
                      minWidth: headers[0].width,
                      maxWidth: headers[0].width,
                      width: headers[0].width,
                    }}
                    align="center"
                  >
                    {category.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[1].width,
                      maxWidth: headers[1].width,
                      width: headers[1].width,
                    }}
                    align="center"
                  >
                    {category.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[2].width,
                      maxWidth: headers[2].width,
                      width: headers[2].width,
                    }}
                    align="center"
                  >
                    {category.code}
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
                        onClick={() => handleEditClick(category)}
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            name="name"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Category Code"
            name="code"
            fullWidth
            value={formValues.code}
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

export default Categories;
