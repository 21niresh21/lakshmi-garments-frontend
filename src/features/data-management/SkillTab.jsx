import React, { useEffect, useState } from "react";
import { fetchSkills, updateSkill } from "../../api/skillApi"; // Ensure these exist
import EditModal from "./EditModal";
import SkillForm from "./forms/SkillForm";
import DataTable from "./DataTable";
import TableSearchToolBar from "./TableSearchToolBar";

const skillColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  // Add more columns as needed
];

export default function SkillTab({ showSnackbar }) {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => setRefresh((prev) => !prev);

  const handleEdit = (row) => setEditRow(row);

  const handleCloseModal = () => setEditRow(null);

  const handleUpdateSkill = (updatedSkill) => {
    updateSkill(updatedSkill.id, { name: updatedSkill.name })
      .then(() => {
        onRefresh();
        showSnackbar("Skill updated successfully!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar("Failed to update skill. An error occurred!", "error");
        }
      });
  };

  useEffect(() => {
    fetchSkills(searchQuery)
      .then((response) => {
        console.log(response.data);
        setRows(response.data || []);
      })
      .catch((err) => {
        showSnackbar("Failed to fetch skills. An error occurred!", "error");
      });
  }, [searchQuery, refresh]);

  return (
    <>
      <DataTable
        columns={skillColumns}
        rows={rows}
        onEdit={handleEdit}
        toolbar={
          <TableSearchToolBar
            header={`Skills (${rows.length})`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search Skill Names"
          />
        }
      />

      <EditModal open={!!editRow} onClose={handleCloseModal}>
        <SkillForm
          initialData={editRow}
          onSubmit={handleUpdateSkill}
          mode="edit"
        />
      </EditModal>
    </>
  );
}
