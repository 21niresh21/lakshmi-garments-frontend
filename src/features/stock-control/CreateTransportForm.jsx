import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

function CreateTransportForm({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 400,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        {/* Typography with background color */}
        <Box
          sx={{
            backgroundColor: "#f5f5f5", // Background color for the Typography area
            padding: "8px 16px",
            marginBottom: 2,
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Typography id="modal-title" variant="h6">
            Add a new Transport
          </Typography>
        </Box>

        {/* Form fields */}
        <Box
          sx={{
            display: "grid",
            m: 2,
            rowGap: 2,
            gridTemplateColumns: "auto",
          }}
        >
          <FormControl>
            <FormLabel>Transport Name</FormLabel>
            <TextField size="small" />
          </FormControl>
        </Box>

        {/* Button with background color */}
        <Box
          sx={{
            backgroundColor: "#f5f5f5", // Background color for the button area
            padding: "8px 16px",
            marginTop: 2,
            borderRadius: "0 0 4px 4px",
            display: "flex",
            justifyContent: "flex-end", // Align button to the right
          }}
        >
          <Stack direction="row" gap={1}>
            <Button
              onClick={onClose}
              size="small"
              sx={{ alignSelf: "end", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ alignSelf: "end", fontWeight: 600 }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateTransportForm;
