import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCategories } from "../../api/categoryApi";

// This toolbar component is used for adding new rows
function EditToolbar(props) {
  const { setRows, setRowModesModel, isSelf } = props;

  const handleClick = () => {
    const id = new Date().getTime(); // Unique ID generation using timestamp

    console.log('apple', isSelf);
    

    setRows((prevRows) => [
      ...prevRows,
      {
        id,
        baleNumber: isSelf === 'self' ? id : "",
        quantity: "",
        length: "",
        price: "",
        quality: "",
        category: "",
        subCategory: "",
        isNew: true,
      }, // New LR item with empty bales
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "baleNumber" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function LRBaleCard({
  item,
  baleItems,
  onDeleteLr,
  updateBale,
  isSelf,
  lrNumberId,
}) {
  const [rows, setRows] = React.useState(baleItems);
  const [categories, setCategories] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [lrNumber, setLrNumber] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  const handleDeleteClick = (id) => {
    // Delete the row from both rows and rowModesModel
    const afterDelete = rows.filter((row) => row.id !== id);
    setRows((oldRows) => oldRows.filter((row) => row.id !== id));
    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      delete newModel[id]; // Remove from rowModesModel
      return newModel;
    });
    updateBale(lrNumberId, afterDelete);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });    
    updateBale(lrNumberId, rows, lrNumber);
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleLrNumber = (e) => {
    setLrNumber(e.target.value);
  };

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.content.map((item) => item.name));
      setLoadingCategories(false); // Set loading to false once categories are fetched
    });
  }, []);

  const columns = [
    {
      field: "baleNumber",
      headerName: "Bale No.",
      width: 90,
      editable: isSelf !== 'self',
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "length",
      headerName: "Length",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "quality",
      headerName: "Quality",
      width: 160,
      editable: true,
    },
    {
      field: "category",
      type: "singleSelect",
      headerName: "Category",
      valueOptions: categories || [],
      width: 90,
      editable: true,
    },
    {
      field: "subCategory",
      headerName: "Sub-Category",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        console.log("balls", isInEditMode);

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        } else
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(id)}
              color="inherit"
            />,
          ];
      },
    },
  ];

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: 5,
          mr: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <CardHeader title="LR Number" />
          {isSelf === "self" ? (
            <TextField disabled size="small" value={lrNumberId} />
          ) : (
            <TextField
              size="small"
              value={lrNumber}
              onChange={handleLrNumber}
            />
          )}
        </Box>

        <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
          <Typography sx={{ justifySelf: "flex-end", alignSelf: "center" }}>
            ded
          </Typography>
          <IconButton size="small" onClick={() => onDeleteLr(item.id)}>
            <CloseIcon size="small" />
          </IconButton>
        </Stack>
      </Box>

      <CardContent>
        {loadingCategories ? (
          <Typography>Loading Categories...</Typography> // Optional loading message
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel, isSelf },
            }}
            disableColumnMenu
            disableColumnResize
            disableAutosize
            disableColumnSorting
            disableColumnFilter
          />
        )}
      </CardContent>
    </Card>
  );
}
