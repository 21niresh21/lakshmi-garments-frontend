import { useEffect, useState } from "react";
import { fetchCategories, updateCategory } from "../../api/categoryApi";
import EditModal from "./EditModal";
import CategoryForm from "./forms/CategoryForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";

const categoryColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Category Name" },
  { field: "code", headerName: "Category Code" },
];

export default function CategoryTab({ showSnackbar }) {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => setRefresh(!refresh);

  const handleEdit = (row) => setEditRow(row);

  const handleCloseModal = () => setEditRow(null);

  const handleUpdateCategory = (updatedCategory) => {
    updateCategory(updatedCategory.id, {
      name: updatedCategory.name,
      code: updatedCategory.code,
    })
      .then(() => {
        onRefresh();
        showSnackbar("Category updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar("Failed to update Category. An error occurred!", "error");
        }
      });
  };

  useEffect(() => {
    fetchCategories(searchQuery)
      .then((response) => setRows(response.data))
      .catch(() => showSnackbar("Failed to fetch categories. An error occurred!", "error"));
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={categoryColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Categories (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={"Search Category Names"}
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <CategoryForm
          initialData={editRow}
          onSubmit={handleUpdateCategory}
          mode="edit"
        />
      </EditModal>
    </>
  );
}