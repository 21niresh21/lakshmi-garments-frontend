import { useEffect, useState } from "react";
import {
  fetchSubCategories,
  updateSubCategory,
} from "../../api/subCategoryApi"; // Make sure these exist
import EditModal from "./EditModal";
import SubCategoryForm from "./forms/SubCategoryForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";

const subCategoryColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
];

export default function SubCategoryTab({ showSnackbar }) {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => setRefresh(!refresh);

  const handleEdit = (row) => setEditRow(row);

  const handleCloseModal = () => setEditRow(null);

  const handleUpdateSubCategory = (updatedSubCategory) => {
    updateSubCategory(updatedSubCategory.id, {
      name: updatedSubCategory.name,
    })
      .then(() => {
        onRefresh();
        showSnackbar("Subcategory updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar(
            "Failed to update Subcategory. An error occurred!",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    fetchSubCategories(searchQuery)
      .then((response) => setRows(response.data.content))
      .catch(() =>
        showSnackbar(
          "Failed to fetch subcategories. An error occurred!",
          "error"
        )
      );
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={subCategoryColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Subcategories (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={"Subcategory Names"}
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <SubCategoryForm
          initialData={editRow}
          onSubmit={handleUpdateSubCategory}
          mode="edit"
        />
      </EditModal>
    </>
  );
}
