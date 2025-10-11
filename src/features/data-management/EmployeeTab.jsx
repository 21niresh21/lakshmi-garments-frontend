import React, { useEffect, useState } from "react";
import { fetchEmployees, updateEmployee } from "../../api/employeeApi"; // Your API functions
import EditModal from "./EditModal";
import EmployeeForm from "./forms/EmployeeForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";

const employeeColumns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "skills",
      headerName: "Skills",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {params.value && params.value.length > 0 ? (
            params.value.map((skill) => (
              <Chip key={skill.id} label={skill.name} size="small" />
            ))
          ) : (
            <em>No Skills</em>
          )}
        </Box>
      ),
    },
  ];

export default function EmployeeTab({ showSnackbar }) {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => setRefresh((prev) => !prev);

  const handleEdit = (row) => setEditRow(row);

  const handleCloseModal = () => setEditRow(null);

  const handleUpdateEmployee = (updatedEmployee) => {
    console.log(updatedEmployee);
    updateEmployee(updatedEmployee.id, updatedEmployee)
      .then(() => {
        onRefresh();
        showSnackbar("Employee updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar(
            "Failed to update Employee. An error occurred!",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    fetchEmployees(searchQuery)
      .then((response) => {
        // Ensure skills are populated as objects for the form and table
        // If your API returns skills as IDs only, you'll need to fetch skill details separately or modify backend to send skill names
        setRows(response.data);
      })
      .catch(() => {
        showSnackbar("Failed to fetch employees. An error occurred!", "error");
      });
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={employeeColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Employees (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={"Search Employee Names"}
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <EmployeeForm
          initialData={editRow}
          onSubmit={handleUpdateEmployee}
          mode="edit"
        />
      </EditModal>
    </>
  );
}
