import React from 'react'
import { useEffect, useState } from "react";
import { fetchTransports, updateTransport } from "../../api/transportApi"; // Make sure these exist
import EditModal from "./EditModal";
import TransportForm from "./forms/TransportForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";

const transportColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  // Add more columns as needed
];

export default function TransportTab({ showSnackbar }) {
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

  const handleUpdateTransport = (updatedTransport) => {
    updateTransport(updatedTransport.id, {
      name: updatedTransport.name,
      // Add other fields as needed
    })
      .then(() => {
        onRefresh(); // Refresh the data after successful update
        showSnackbar("Transport updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar(
            "Failed to update Transport. An error occurred!",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    fetchTransports(searchQuery)
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => {
        showSnackbar("Failed to fetch transports. An error occurred!", "error");
      });
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={transportColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Transports (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={"Search Transport Names"}
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <TransportForm
          initialData={editRow}
          onSubmit={handleUpdateTransport}
          mode="edit"
        />
      </EditModal>
    </>
  );
}