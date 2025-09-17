import { useEffect, useState } from "react";
import { fetchSuppliers, updateSupplier } from "../../api/supplierApi";
import EditModal from "./EditModal";
import SupplierForm from "./forms/SupplierForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";

const supplierColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "location", headerName: "Location" },
];

export default function SupplierTab({ showSnackbar }) {
  const [rows, setRows] = useState([]); // normally fetched via API
  const [editRow, setEditRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(!refresh);
  };

  const handleEdit = (row) => {
    setEditRow(row);
  };

  const handleCloseModal = () => {
    setEditRow(null);
  };

  const handleUpdateSupplier = (updatedSupplier) => {
    updateSupplier(updatedSupplier.id, {
      name: updatedSupplier.name,
      location: updatedSupplier.location,
    })
      .then(() => {
        onRefresh(); // <-- Refresh the data after successful update
        showSnackbar("Supplier updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar(
            "Failed to update Supplier. An error occurred!",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    fetchSuppliers(searchQuery)
      .then((response) => {
        setRows(response.data.content);
      })
      .catch((err) => {
        showSnackbar("Failed to fetch suppliers. An error occurred!", "error");
      });
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={supplierColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Suppliers (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={"Search Supplier Names"}
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <SupplierForm initialData={editRow} onSubmit={handleUpdateSupplier} />
      </EditModal>
    </>
  );
}
