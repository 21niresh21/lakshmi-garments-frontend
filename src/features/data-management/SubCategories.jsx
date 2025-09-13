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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import TableSearchToolBar from "./TableSearchToolBar";
import EditIcon from "@mui/icons-material/Edit";
import NoDataTable from "../../components/NoDataTable";
import { useState } from "react";
import { HeaderCell } from "../../components/styled";

const headers = [
  { id: 1, label: "ID", width: 80, align: "center" },
  { id: 2, label: "Sub Category Name", width: 250, align: "center" },
  { id: 3, label: "Category Name", width: 250, align: "center" },
  { id: 4, label: "Actions", width: 100, align: "center" },
];

function SubCategories({ data, categories, onSave, searchQuery, handleSearchQueryChange }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", categoryId: "" });

  const handleEditClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setFormValues({
      name: subCategory.name,
      categoryId: subCategory.category?.id || "",
    });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedSubCategory(null);
    setFormValues({ name: "", categoryId: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (onSave && selectedSubCategory) {
      // Find the selected category object by id
      const selectedCategoryObj = categories.find(
        (cat) => cat.id === formValues.categoryId
      );

      const updatedSubCategory = {
        ...selectedSubCategory,
        name: formValues.name,
        category: selectedCategoryObj || null,
      };

      onSave(updatedSubCategory);
    }
    handleCloseModal();
  };

  return (
    <Paper>
      <TableSearchToolBar
        header={`Sub Categories (${data.length})`}
        placeholder="Search Sub Category"
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
              data.map((subCategory) => (
                <TableRow key={subCategory.id}>
                  <TableCell
                    sx={{
                      minWidth: headers[0].width,
                      maxWidth: headers[0].width,
                      width: headers[0].width,
                    }}
                    align="center"
                  >
                    {subCategory.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[1].width,
                      maxWidth: headers[1].width,
                      width: headers[1].width,
                    }}
                    align="center"
                  >
                    {subCategory.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: headers[2].width,
                      maxWidth: headers[2].width,
                      width: headers[2].width,
                    }}
                    align="center"
                  >
                    {subCategory.category?.name || "-"}
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
                        onClick={() => handleEditClick(subCategory)}
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
        <DialogTitle>Edit Sub Category</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            margin="dense"
            label="Sub Category Name"
            name="name"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              name="categoryId"
              value={formValues.categoryId}
              label="Category"
              onChange={handleInputChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default SubCategories;
